import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-text-primary mb-2">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: January 4, 2026</p>
        
        <div className="prose prose-invert max-w-none text-text-secondary space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Stacker (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
            </p>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Description of Service</h2>
            <p>
              Stacker is a directory and curation platform that allows users to discover, submit, and share resources. Our Service includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browsing and searching curated directories</li>
              <li>Creating user accounts and profiles</li>
              <li>Submitting resources and content for review</li>
              <li>Bookmarking and organizing favorites</li>
              <li>Interacting with other users and content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">3. User Accounts</h2>
            
            <h3 className="text-xl font-medium text-text-primary mb-2">3.1 Account Creation</h3>
            <p>
              To access certain features, you must create an account. You agree to provide accurate, current, and complete information during registration and keep your account information updated.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized access or security breach.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or for any other reason at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">4. User Content</h2>
            
            <h3 className="text-xl font-medium text-text-primary mb-2">4.1 Your Content</h3>
            <p>
              You retain ownership of content you submit (&quot;User Content&quot;). By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, and distribute your content in connection with the Service.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">4.2 Content Standards</h3>
            <p>You agree not to submit content that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Infringes on intellectual property rights of others</li>
              <li>Contains malware, viruses, or harmful code</li>
              <li>Is false, misleading, or deceptive</li>
              <li>Is illegal, harmful, threatening, abusive, or harassing</li>
              <li>Violates any applicable laws or regulations</li>
              <li>Contains spam, advertisements, or solicitations</li>
              <li>Impersonates any person or entity</li>
            </ul>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">4.3 Content Moderation</h3>
            <p>
              We reserve the right to review, edit, or remove any User Content at our sole discretion, without notice. We are not obligated to monitor or review all content but may do so.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-text-primary mb-2">5.1 Our Content</h3>
            <p>
              The Service and its original content (excluding User Content), features, and functionality are owned by Stacker and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-text-primary mb-2 mt-4">5.2 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes. This license does not include the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify, copy, or create derivative works</li>
              <li>Use data mining, robots, or similar data gathering methods</li>
              <li>Download or copy account information for commercial purposes</li>
              <li>Reverse engineer or decompile any part of the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Circumvent any access restrictions or security measures</li>
              <li>Use automated systems to access the Service without permission</li>
              <li>Collect or harvest user information without consent</li>
              <li>Engage in any activity that could damage or impair the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Third-Party Links and Services</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
            </p>
            <p>
              Your use of third-party websites is at your own risk and subject to their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Implied warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties that the Service will be uninterrupted, error-free, or secure</li>
              <li>Warranties regarding the accuracy or reliability of any content</li>
            </ul>
            <p className="mt-4">
              We do not warrant that the results obtained from using the Service will be accurate or reliable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, STACKER AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of profits, data, or goodwill</li>
              <li>Service interruption or computer damage</li>
              <li>Cost of substitute services</li>
              <li>Any damages resulting from your use of the Service</li>
            </ul>
            <p className="mt-4">
              Our total liability shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Stacker and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorneys&apos; fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
              <li>Your User Content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Stacker operates, without regard to its conflict of law provisions.
            </p>
            <p>
              Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration, except where prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">12. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">13. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Stacker regarding the Service and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">14. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@stacker.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
