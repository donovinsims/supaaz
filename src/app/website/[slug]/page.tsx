import { notFound } from "next/navigation";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import WebsiteDetail from "@/components/sections/website-detail";
import { websites, getWebsiteBySlug } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return websites.map((website) => ({
    slug: website.slug,
  }));
}

export default async function WebsitePage({ params }: Props) {
  const { slug } = await params;
  const website = getWebsiteBySlug(slug);

  if (!website) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <WebsiteDetail website={website} />
      <Footer />
    </div>
  );
}
