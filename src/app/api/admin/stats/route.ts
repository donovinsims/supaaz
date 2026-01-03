import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdmin(user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [usersResult, submissionsResult, pendingResult] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("submissions").select("id", { count: "exact" }),
      supabase.from("submissions").select("id", { count: "exact" }).eq("status", "pending"),
    ]);

    return NextResponse.json({
      totalUsers: usersResult.count ?? 0,
      totalSubmissions: submissionsResult.count ?? 0,
      pendingSubmissions: pendingResult.count ?? 0,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
