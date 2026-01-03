import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark, Globe, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

async function getStats(userId: string): Promise<{ savedCreators: number; submittedWebsites: number }> {
  try {
    const supabase = await createClient();
    
    const [bookmarksResult, submissionsResult] = await Promise.all([
      supabase.from("bookmarks").select("id", { count: "exact" }).eq("user_id", userId),
      supabase.from("submissions").select("id", { count: "exact" }).eq("user_id", userId),
    ]);

    if (bookmarksResult.error) {
      console.error("Error fetching bookmarks count:", bookmarksResult.error);
    }
    if (submissionsResult.error) {
      console.error("Error fetching submissions count:", submissionsResult.error);
    }

    return {
      savedCreators: bookmarksResult.count ?? 0,
      submittedWebsites: submissionsResult.count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { savedCreators: 0, submittedWebsites: 0 };
  }
}

interface Activity {
  type: "bookmark";
  slug: string;
  createdAt: string;
}

async function getRecentActivity(userId: string): Promise<Activity[]> {
  try {
    const supabase = await createClient();
    
    const { data: bookmarks, error } = await supabase
      .from("bookmarks")
      .select("website_slug, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching recent activity:", error);
      return [];
    }

    return (bookmarks ?? []).map((b) => ({
      type: "bookmark" as const,
      slug: b.website_slug,
      createdAt: b.created_at,
    }));
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const [stats, recentActivity] = await Promise.all([
    getStats(user.id),
    getRecentActivity(user.id),
  ]);

  const firstName = user.user_metadata?.full_name?.split(" ")[0] || 
                   user.email?.split("@")[0] || 
                   "there";

  const hasActivity = recentActivity.length > 0 || stats.savedCreators > 0 || stats.submittedWebsites > 0;

  return (
    <div className="min-h-screen bg-page">
      <DashboardSidebar />
      
      <main className="lg:pl-[240px] pt-14 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-5xl">
          <header className="mb-8">
            <h1 className="text-2xl font-semibold text-text-primary">
              Welcome back, {firstName}
            </h1>
            <p className="text-text-secondary mt-1">
              Here&apos;s what&apos;s happening with your account
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-[12px] border border-border-1 bg-ui-1 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-blue-500/10 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-[13px] font-medium text-text-secondary">Saved Creators</span>
              </div>
              <p className="text-3xl font-semibold text-text-primary">{stats.savedCreators}</p>
            </div>

            <div className="rounded-[12px] border border-border-1 bg-ui-1 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-[8px] bg-green-500/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-[13px] font-medium text-text-secondary">Submitted Websites</span>
              </div>
              <p className="text-3xl font-semibold text-text-primary">{stats.submittedWebsites}</p>
            </div>
          </div>

          {hasActivity ? (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
              </div>
              
              {recentActivity.length > 0 ? (
                <div className="rounded-[12px] border border-border-1 bg-ui-1 divide-y divide-border-1">
                  {recentActivity.map((activity, index) => (
                    <Link
                      key={index}
                      href={`/website/${activity.slug}`}
                      className="flex items-center gap-4 p-4 hover:bg-ui-2 transition-colors first:rounded-t-[12px] last:rounded-b-[12px]"
                    >
                      <div className="w-9 h-9 rounded-[8px] bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Bookmark className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-text-primary truncate">
                          Saved {activity.slug.replace(/-/g, " ")}
                        </p>
                        <p className="text-[12px] text-text-secondary flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-secondary shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-[12px] border border-border-1 bg-ui-1 p-6 text-center">
                  <p className="text-text-secondary text-[14px]">No recent activity yet</p>
                </div>
              )}
            </section>
          ) : (
            <section className="rounded-[12px] border border-border-1 bg-ui-1 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-ui-2 flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-6 h-6 text-text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Start exploring creators
              </h3>
              <p className="text-text-secondary text-[14px] mb-5 max-w-sm mx-auto">
                Discover and save your favorite creators to build your personalized collection.
              </p>
              <Link
                href="/creators"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-text-primary text-page text-[14px] font-medium hover:opacity-90 transition-opacity"
              >
                Browse Creators
                <ArrowRight className="w-4 h-4" />
              </Link>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
