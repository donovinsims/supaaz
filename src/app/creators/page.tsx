import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import CreatorsHero from "@/components/sections/creators-hero";
import CreatorsGrid from "@/components/sections/creators-grid";

export default function CreatorsPage() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <CreatorsHero />
      <CreatorsGrid />
      <Footer />
    </div>
  );
}
