"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Users, FileText, Clock, Check, X, Loader2, ExternalLink, AlertCircle, Download, Link } from "lucide-react";
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
  user_id: string;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string;
}

type Tab = "pending" | "users" | "submissions";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([]);
  const [allSubmissions, setAllSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("pending");

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

    const [statsRes, submissionsRes, usersRes, allSubmissionsRes] = await Promise.all([
      fetch("/api/admin/stats"),
      fetch("/api/admin/submissions"),
      fetch("/api/admin/users"),
      fetch("/api/admin/all-submissions"),
    ]);

    if (statsRes.status === 401 || submissionsRes.status === 401) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }

    setIsAuthorized(true);

    if (statsRes.ok) setStats(await statsRes.json());
    if (submissionsRes.ok) setPendingSubmissions(await submissionsRes.json());
    if (usersRes.ok) setUsers(await usersRes.json());
    if (allSubmissionsRes.ok) setAllSubmissions(await allSubmissionsRes.json());

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

      if (!res.ok) throw new Error("Failed to update submission");

      setPendingSubmissions((prev) => prev.filter((s) => s.id !== id));
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

  function exportToCSV(data: Record<string, unknown>[], filename: string) {
    if (data.length === 0) {
      toast.error("No data to export");
      return;
    }
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((h) => {
          const val = row[h];
          const str = val === null || val === undefined ? "" : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        }).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Export complete");
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
          <StatCard icon={<Users className="w-5 h-5" />} label="Total Users" value={stats?.totalUsers ?? 0} />
          <StatCard icon={<FileText className="w-5 h-5" />} label="Total Submissions" value={stats?.totalSubmissions ?? 0} />
          <StatCard icon={<Clock className="w-5 h-5" />} label="Pending Review" value={stats?.pendingSubmissions ?? 0} highlight />
        </div>

        <div className="flex gap-2 mb-6 border-b border-border-1">
          {([
            { key: "pending", label: "Pending Submissions", count: pendingSubmissions.length },
            { key: "users", label: "All Users", count: users.length },
            { key: "submissions", label: "All Submissions", count: allSubmissions.length },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-[14px] font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.key
                  ? "border-text-primary text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {activeTab === "pending" && (
          <PendingSection
            submissions={pendingSubmissions}
            actionLoading={actionLoading}
            rejectingId={rejectingId}
            rejectReason={rejectReason}
            setRejectingId={setRejectingId}
            setRejectReason={setRejectReason}
            handleAction={handleAction}
          />
        )}

        {activeTab === "users" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text-primary">All Users</h2>
              <Button variant="outline" size="sm" onClick={() => exportToCSV(users, "users")} className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="rounded-xl border border-border-1 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead className="bg-ui-2">
                    <tr>
                      <th className="text-left p-3 font-medium text-text-secondary">Email</th>
                      <th className="text-left p-3 font-medium text-text-secondary">Signed Up</th>
                      <th className="text-left p-3 font-medium text-text-secondary">Last Sign In</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-1 bg-ui-1">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-8 text-center text-text-secondary">No users found</td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id} className="hover:bg-ui-2/50">
                          <td className="p-3 text-text-primary">{user.email}</td>
                          <td className="p-3 text-text-secondary">{formatDate(user.created_at)}</td>
                          <td className="p-3 text-text-secondary">{user.last_sign_in_at ? formatDate(user.last_sign_in_at) : "Never"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === "submissions" && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-text-primary">All Submitted Tools</h2>
              <Button variant="outline" size="sm" onClick={() => exportToCSV(allSubmissions, "submissions")} className="gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </div>
            <div className="rounded-xl border border-border-1 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead className="bg-ui-2">
                    <tr>
                      <th className="text-left p-3 font-medium text-text-secondary">Title</th>
                      <th className="text-left p-3 font-medium text-text-secondary">URL</th>
                      <th className="text-left p-3 font-medium text-text-secondary">Category</th>
                      <th className="text-left p-3 font-medium text-text-secondary">Status</th>
                      <th className="text-left p-3 font-medium text-text-secondary">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-1 bg-ui-1">
                    {allSubmissions.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-text-secondary">No submissions found</td>
                      </tr>
                    ) : (
                      allSubmissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-ui-2/50">
                          <td className="p-3 text-text-primary font-medium">{sub.title}</td>
                          <td className="p-3">
                            <a href={sub.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 flex items-center gap-1">
                              <Link className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[200px]">{sub.website_url}</span>
                            </a>
                          </td>
                          <td className="p-3 text-text-secondary">{sub.category}</td>
                          <td className="p-3">
                            <StatusBadge status={sub.status} />
                          </td>
                          <td className="p-3 text-text-secondary">{formatDate(sub.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function PendingSection({
  submissions,
  actionLoading,
  rejectingId,
  rejectReason,
  setRejectingId,
  setRejectReason,
  handleAction,
}: {
  submissions: Submission[];
  actionLoading: string | null;
  rejectingId: string | null;
  rejectReason: string;
  setRejectingId: (id: string | null) => void;
  setRejectReason: (reason: string) => void;
  handleAction: (id: string, action: "approve" | "reject", reason?: string) => void;
}) {
  if (submissions.length === 0) {
    return (
      <div className="rounded-xl border border-border-1 bg-ui-1 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-ui-2 flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-text-secondary">All caught up! No pending submissions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((submission) => (
        <div key={submission.id} className="rounded-xl border border-border-1 bg-ui-1 p-5">
          <div className="flex gap-5">
            {submission.image_url && (
              <img src={submission.image_url} alt={submission.title} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[15px] font-medium text-text-primary">{submission.title}</h3>
                  <p className="text-[13px] text-text-secondary mt-0.5">{submission.tagline}</p>
                </div>
                <span className="text-[12px] text-text-secondary px-2 py-1 rounded-full bg-ui-2">{submission.category}</span>
              </div>
              <p className="text-[13px] text-text-secondary mt-2 line-clamp-2">{submission.description}</p>
              <a href={submission.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-blue-500 hover:text-blue-400 mt-2">
                <ExternalLink className="w-3.5 h-3.5" />
                {submission.website_url}
              </a>
              {rejectingId === submission.id ? (
                <div className="flex items-center gap-2 mt-4">
                  <Input placeholder="Rejection reason (optional)" value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} className="flex-1" />
                  <Button size="sm" variant="destructive" onClick={() => handleAction(submission.id, "reject", rejectReason)} disabled={actionLoading === submission.id}>
                    {actionLoading === submission.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => { setRejectingId(null); setRejectReason(""); }}>Cancel</Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" onClick={() => handleAction(submission.id, "approve")} disabled={actionLoading === submission.id} className="gap-1.5">
                    {actionLoading === submission.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Approve</>}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setRejectingId(submission.id)} disabled={actionLoading === submission.id} className="gap-1.5">
                    <X className="w-4 h-4" /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatCard({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: number; highlight?: boolean }) {
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-500",
    approved: "bg-green-500/10 text-green-500",
    rejected: "bg-red-500/10 text-red-500",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[12px] font-medium ${styles[status] || "bg-ui-2 text-text-secondary"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
