import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { Globe, User as UserIcon, Lock } from "lucide-react";
import type { User, Submission } from "@/db/schema";

interface Props {
  params: Promise<{ username: string }>;
}

async function getUserByUsername(username: string): Promise<User | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data) {
    return null;
  }

  return data as User;
}

async function getUserSubmissions(userId: string): Promise<Submission[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("submissions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return (data || []) as Submission[];
}

interface BookmarkWithSubmission {
  submission: Submission;
}

async function getUserPublicBookmarks(userId: string): Promise<Submission[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookmarks")
    .select(`
      submission:submissions (
        id,
        slug,
        title,
        tagline,
        description,
        url,
        category,
        framework,
        cms,
        images,
        status,
        user_id,
        created_at,
        updated_at
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data || [])
    .filter((b): b is BookmarkWithSubmission => b.submission !== null && (b.submission as Submission).status === "approved")
    .map((b) => b.submission as Submission);
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  if (!user.is_public) {
    return (
      <div className="min-h-screen bg-page transition-theme">
        <Navbar />
        <main className="pt-[120px] pb-16">
          <div className="container max-w-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-ui-2 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-text-secondary" />
            </div>
            <h1 className="text-[24px] font-semibold text-text-primary mb-2">
              This profile is private
            </h1>
            <p className="text-text-secondary">
              @{username} has chosen to keep their profile private.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const [submissions, bookmarks] = await Promise.all([
    getUserSubmissions(user.id),
    user.show_bookmarks_publicly ? getUserPublicBookmarks(user.id) : Promise.resolve([]),
  ]);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="pt-[100px] pb-16">
        <div className="container max-w-4xl">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-24 h-24 rounded-full bg-ui-2 flex items-center justify-center overflow-hidden mb-4 border-2 border-border-1">
              {user.avatar_url ? (
                <Image
                  src={user.avatar_url}
                  alt={user.full_name || user.username || "User"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-10 h-10 text-text-secondary" />
              )}
            </div>
            <h1 className="text-[28px] font-bold text-text-primary mb-1">
              {user.full_name || user.username}
            </h1>
            <p className="text-text-secondary text-[15px] mb-3">@{user.username}</p>
            {user.bio && (
              <p className="text-text-secondary text-[15px] max-w-md mb-4">{user.bio}</p>
            )}
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary text-[14px] hover:underline"
              >
                <Globe className="w-4 h-4" />
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>

          {submissions.length > 0 && (
            <section className="mb-12">
              <h2 className="text-[18px] font-semibold text-text-primary mb-5">
                Submissions ({submissions.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {submissions.map((submission) => (
                  <Link
                    key={submission.id}
                    href={`/website/${submission.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[10px] border border-border-1 bg-ui-1 mb-3">
                      {submission.images?.[0] && (
                        <Image
                          src={submission.images[0]}
                          alt={submission.title}
                          width={400}
                          height={267}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <h3 className="text-[15px] font-medium text-text-primary group-hover:text-primary transition-colors">
                      {submission.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary line-clamp-1">
                      {submission.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {user.show_bookmarks_publicly && bookmarks.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-text-primary mb-5">
                Bookmarks ({bookmarks.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {bookmarks.map((submission) => (
                  <Link
                    key={submission.id}
                    href={`/website/${submission.slug}`}
                    className="group block"
                  >
                    <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[10px] border border-border-1 bg-ui-1 mb-3">
                      {submission.images?.[0] && (
                        <Image
                          src={submission.images[0]}
                          alt={submission.title}
                          width={400}
                          height={267}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <h3 className="text-[15px] font-medium text-text-primary group-hover:text-primary transition-colors">
                      {submission.title}
                    </h3>
                    <p className="text-[13px] text-text-secondary line-clamp-1">
                      {submission.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {submissions.length === 0 && (!user.show_bookmarks_publicly || bookmarks.length === 0) && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No public content yet.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
