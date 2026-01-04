import { notFound } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import WebsiteDetail from "@/components/sections/website-detail";
import { createClient } from "@/lib/supabase/server";
import type { Submission } from "@/db/schema";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getSubmissionBySlug(slug: string): Promise<Submission | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) {
    return null;
  }

  return data as Submission;
}

async function getRelatedSubmissions(currentSlug: string, category: string, limit: number = 4): Promise<Submission[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("status", "approved")
    .eq("category", category)
    .neq("slug", currentSlug)
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data as Submission[];
}

export default async function WebsitePage({ params }: Props) {
  const { slug } = await params;
  const submission = await getSubmissionBySlug(slug);

  if (!submission) {
    notFound();
  }

  const relatedSubmissions = await getRelatedSubmissions(slug, submission.category);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <WebsiteDetail submission={submission} relatedSubmissions={relatedSubmissions} />
      <Footer />
    </div>
  );
}
