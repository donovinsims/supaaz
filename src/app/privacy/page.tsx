import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const dynamic = "force-static";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: January 4, 2026</p>
        
        <div className="prose prose-invert max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Introduction</h2>
            <p>
              Welcome to Stacker (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p>
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-text-primary mb-2">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, profile picture, and authentication credentials when you create an account.</li>
              <li><strong>Profile Information:</strong> Bio, website URL, social links, and other details you add to your profile.</li>
              <li><strong>Submissions:</strong> Content, descriptions, and metadata for directories or resources you submit.</li>
              <li><strong>Communications:</strong> Messages, feedback, and support requests you send to us.</li>
            </ul>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Usage Data:</strong> Pages visited, features used, and interactions with our platform.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device identifiers, and IP address.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to enhance your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Third-Party Services</h2>
            <p>We use trusted third-party services to operate our platform:</p>
            
            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">3.1 Supabase</h3>
            <p>
              We use <strong>Supabase</strong> for authentication, database storage, and file storage. Your account information and user-generated content are securely stored on Supabase&apos;s infrastructure. Supabase complies with SOC 2 Type II standards and GDPR requirements. Learn more at{" "}
              <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                Supabase Privacy Policy
              </a>.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">3.2 PostHog (Analytics)</h3>
            <p>
              We use <strong>PostHog</strong> for product analytics to understand how users interact with our platform. PostHog collects usage data such as page views, feature usage, and session information. This data helps us improve our services and user experience. You can opt out of analytics tracking via our cookie consent banner. Learn more at{" "}
              <a href="https://posthog.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                PostHog Privacy Policy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your account registration and manage your profile</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you updates, newsletters, and marketing communications (with your consent)</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience. When you first visit our site, you will see a cookie consent banner where you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Accept:</strong> Allow all cookies, including analytics (PostHog)</li>
              <li><strong>Decline:</strong> Only essential cookies will be used; analytics tracking will be disabled</li>
            </ul>
            <p className="mt-4">
              <strong>Essential Cookies:</strong> Required for basic site functionality, authentication, and security. These cannot be disabled.
            </p>
            <p>
              <strong>Analytics Cookies:</strong> Used by PostHog to collect usage data. These can be disabled via our cookie consent banner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (Supabase, PostHog)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit (HTTPS/TLS)</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security assessments</li>
              <li>Access controls and monitoring</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Opt out of marketing communications and analytics tracking</li>
              <li><strong>Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at the email provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide you services. We may retain certain information as required by law or for legitimate business purposes, such as resolving disputes or enforcing our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 16 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@stacker.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
