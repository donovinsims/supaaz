import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none text-text-secondary space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, submit content, or contact us for support. This may include your name, email address, and profile information from third-party services like Google or Twitter.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Data Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this policy or with your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Cookies</h2>
            <p>
              We use cookies and similar technologies to track activity on our service and hold certain information to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Security</h2>
            <p>
              We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized access.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
