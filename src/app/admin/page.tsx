"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Users, FileText, Clock, Check, X, Loader2, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Stats {
  totalUsers: number;
  totalSubmissions: number;
  pendingSubmissions: number;
}

interface Submission {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  website_url: string;
  image_url: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  async function checkAuthAndFetchData() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    const [statsRes, submissionsRes] = await Promise.all([
      fetch("/api/admin/stats"),
      fetch("/api/admin/submissions"),
    ]);

    if (statsRes.status === 401 || submissionsRes.status === 401) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    setIsAuthorized(true);

    if (statsRes.ok) {
      setStats(await statsRes.json());
    }
    if (submissionsRes.ok) {
      setSubmissions(await submissionsRes.json());
    }

    setLoading(false);
  }

  async function handleAction(id: string, action: "approve" | "reject", reason?: string) {
    setActionLoading(id);

    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, reason }),
      });

      if (!res.ok) {
        throw new Error("Failed to update submission");
      }

      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setStats((prev) => prev ? { ...prev, pendingSubmissions: prev.pendingSubmissions - 1 } : null);
      setRejectingId(null);
      setRejectReason("");

      toast.success(action === "approve" ? "Submission Approved" : "Submission Rejected");
    } catch (error) {
      toast.error("Action Failed", { description: "Please try again" });
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-text-secondary" />
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">Access Denied</h1>
          <p className="text-text-secondary mb-6">
            You don't have permission to access the admin dashboard.
          </p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-6xl mx-auto p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary mt-1">Manage submissions and view stats</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Total Users"
            value={stats?.totalUsers ?? 0}
          />
          <StatCard
            icon={<FileText className="w-5 h-5" />}
            label="Total Submissions"
            value={stats?.totalSubmissions ?? 0}
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            label="Pending Review"
            value={stats?.pendingSubmissions ?? 0}
            highlight
          />
        </div>

        <section>
          <h2 className="text-lg font-medium text-text-primary mb-4">Pending Submissions</h2>
          
          {submissions.length === 0 ? (
            <div className="rounded-xl border border-border-1 bg-ui-1 p-12 text-center">
              <div className="w-12 h-12 rounded-full bg-ui-2 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-text-secondary">All caught up! No pending submissions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="rounded-xl border border-border-1 bg-ui-1 p-5"
                >
                  <div className="flex gap-5">
                    {submission.image_url && (
                      <img
                        src={submission.image_url}
                        alt={submission.title}
                        className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[15px] font-medium text-text-primary">
                            {submission.title}
                          </h3>
                          <p className="text-[13px] text-text-secondary mt-0.5">
                            {submission.tagline}
                          </p>
                        </div>
                        <span className="text-[12px] text-text-secondary px-2 py-1 rounded-full bg-ui-2">
                          {submission.category}
                        </span>
                      </div>
                      
                      <p className="text-[13px] text-text-secondary mt-2 line-clamp-2">
                        {submission.description}
                      </p>

                      <a
                        href={submission.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-blue-500 hover:text-blue-400 mt-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {submission.website_url}
                      </a>

                      {rejectingId === submission.id ? (
                        <div className="flex items-center gap-2 mt-4">
                          <Input
                            placeholder="Rejection reason (optional)"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleAction(submission.id, "reject", rejectReason)}
                            disabled={actionLoading === submission.id}
                          >
                            {actionLoading === submission.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setRejectingId(null);
                              setRejectReason("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-4">
                          <Button
                            size="sm"
                            onClick={() => handleAction(submission.id, "approve")}
                            disabled={actionLoading === submission.id}
                            className="gap-1.5"
                          >
                            {actionLoading === submission.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setRejectingId(submission.id)}
                            disabled={actionLoading === submission.id}
                            className="gap-1.5"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border-1 bg-ui-1 p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${highlight ? "bg-amber-500/10 text-amber-500" : "bg-ui-2 text-text-secondary"}`}>
          {icon}
        </div>
        <div>
          <p className="text-[13px] text-text-secondary">{label}</p>
          <p className="text-xl font-semibold text-text-primary">{value}</p>
        </div>
      </div>
    </div>
  );
}
