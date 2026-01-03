import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import CategoryTabs from "@/components/sections/category-tabs";
import DirectoryGrid from "@/components/sections/directory-grid";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <HeroSection />
      <CategoryTabs />
      <DirectoryGrid />
      <Footer />
    </div>
  );
}
