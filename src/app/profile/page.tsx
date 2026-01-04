import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileContent } from "./profile-content";
import type { User, Submission, Bookmark } from "@/db/schema";

interface BookmarkWithSubmission extends Bookmark {
  submission?: Submission;
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select(`
      id,
      user_id,
      submission_id,
      created_at,
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
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const formattedBookmarks: BookmarkWithSubmission[] = (bookmarks || []).map((b) => ({
    id: b.id,
    user_id: b.user_id,
    submission_id: b.submission_id,
    created_at: b.created_at,
    submission: b.submission as Submission | undefined,
  }));

  return (
    <ProfileContent 
      user={user} 
      profile={profile as User | null} 
      bookmarks={formattedBookmarks} 
    />
  );
}
