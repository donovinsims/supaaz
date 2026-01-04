import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Supaa's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Disclaimer</h2>
            <p>
              The materials on Supaa's website are provided on an 'as is' basis. Supaa makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Limitations</h2>
            <p>
              In no event shall Supaa or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Supaa's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Supaa's website could include technical, typographical, or photographic errors. Supaa does not warrant that any of the materials on its website are accurate, complete or current.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
