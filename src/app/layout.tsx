import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "@/contexts/theme-context";
import { CategoryProvider } from "@/contexts/category-context";
import { AuthModalProvider } from "@/contexts/auth-modal-context";
import { PostHogProvider } from "./providers";
import { AuthCodeHandler } from "@/components/auth/auth-code-handler";
import { CookieBanner } from "@/components/privacy/cookie-banner";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stacker - Discover the Best Online Directories",
  description: "Start your own directory with Stacker Framer template for listing and curation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.variable} ${caveat.variable} antialiased`}>
      <Script
        id="orchids-browser-logs"
        src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
        strategy="afterInteractive"
        data-orchids-project-id="8327a454-7780-4a77-8536-042a8f12d6e5"
      />
<PostHogProvider>
              <ThemeProvider>
                <CategoryProvider>
                  <AuthModalProvider>
                    <AuthCodeHandler />
                    {children}
                    <CookieBanner />
                  </AuthModalProvider>
                </CategoryProvider>
              </ThemeProvider>
            </PostHogProvider>


      <VisualEditsMessenger />
    </body>
    </html>
  );
}
