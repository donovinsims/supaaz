"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { TeamMember } from "@/components/learn/team-member";
import { Users, BookOpen, Video, Gift } from "lucide-react";

const teamMembers = [
  {
    name: "Ben Tossell",
    role: "Founder",
    description:
      "Ben built a no-code education company, Makerpad, and sold it to Zapier in 2021. He then started the first AI daily newsletter in October 2022. He also invests in AI companies through Ben's Bites Fund.",
    image: "/ben-tossell-portrait.jpg",
  },
  {
    name: "Keshav",
    role: "Content Manager",
    description: "Keshav has been with Ben's Bites since Jan '23 and manages our newsletter content and publishing.",
    image: "/placeholder.svg",
  },
  {
    name: "Shanice",
    role: "COO",
    description:
      "Shanice makes companies run well. Previously, she was COO of Makerpad, alongside Ben, and is now COO of Ben's Bites.",
    image: "/placeholder.svg",
  },
  {
    name: "Adam Tossell",
    role: "Product Designer",
    description:
      "Adam designs and builds products—he built this website, and also built Grizzly Ads which powers our ads for our newsletter. And yes, is Ben's brother.",
    image: "/placeholder.svg",
  },
];

export default function AboutPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />

      <main className="pt-[80px] pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[12px] bg-pink-500/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">About</h1>
                <p className="text-[14px] text-text-secondary">Meet the team behind Ben's Bites</p>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>

          {/* Mission Section */}
          <section className="bg-ui-1 border border-border-1 rounded-[16px] p-6 mb-8">
            <h2 className="text-[18px] font-semibold text-text-primary mb-4">Our Mission</h2>
            <p className="text-text-secondary text-[14px] leading-relaxed mb-4">
              We help non-technical folks build apps with AI. Ben was a no-code 'pioneer' who founded the no-code
              education site Makerpad and sold it to Zapier.
            </p>
            <p className="text-text-secondary text-[14px] leading-relaxed mb-4">
              Now we create videos and posts breaking down how non-technical people can use AI tools like Cursor, Replit,
              Bolt and others—to build their own projects, without knowing how to code.
            </p>
            <p className="text-text-secondary text-[14px] leading-relaxed">
              With over 120,000 subscribers, we're building a community of AI builders who are learning to create amazing
              things without traditional coding skills.
            </p>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[28px] font-bold text-text-primary mb-1">120k+</p>
              <p className="text-[12px] text-text-secondary">Subscribers</p>
            </div>
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-[28px] font-bold text-text-primary mb-1">500+</p>
              <p className="text-[12px] text-text-secondary">Tutorials</p>
            </div>
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Video className="w-5 h-5 text-violet-500" />
              </div>
              <p className="text-[28px] font-bold text-text-primary mb-1">50+</p>
              <p className="text-[12px] text-text-secondary">Workshops</p>
            </div>
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Gift className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-[28px] font-bold text-text-primary mb-1">32</p>
              <p className="text-[12px] text-text-secondary">Partner Perks</p>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="bg-amber-500/10 border border-amber-500/20 rounded-[16px] p-6">
            <h2 className="text-[18px] font-semibold text-text-primary mb-2">Join our newsletter</h2>
            <p className="text-text-secondary text-[14px] mb-4">
              A breakdown for non-technical builders on how to use AI coding tools. 120k+ subscribers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-ui-1 border border-border-1 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[48px] text-[14px] text-text-primary placeholder:text-text-secondary"
              />
              <button className="px-6 py-3 bg-text-primary text-page font-medium rounded-[12px] hover:opacity-90 transition-opacity min-h-[48px] text-[14px]">
                Subscribe
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
