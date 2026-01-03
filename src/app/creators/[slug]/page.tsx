import { notFound } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import CreatorProfile from "@/components/sections/creator-profile";
import { creators } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return creators.map((creator) => ({
    slug: creator.slug,
  }));
}

export default async function CreatorPage({ params }: Props) {
  const { slug } = await params;
  const creator = creators.find((c) => c.slug === slug);

  if (!creator) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <CreatorProfile creator={creator} />
      <Footer />
    </div>
  );
}
