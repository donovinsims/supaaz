"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { WorkshopCard } from "@/components/learn/workshop-card";
import { LearnSearchInput } from "@/components/learn/search-input";
import { SortButton } from "@/components/learn/sort-button";
import { Video } from "lucide-react";

const workshops = [
  {
    title: "Building AI Apps with Claude and Next.js",
    description: "Learn how to integrate Claude into your Next.js applications for intelligent features.",
    date: "May 15, 2025",
    speaker: "Ben Tossell",
    speakerImage: "/ben-tossell-portrait.jpg",
    image: "/claude-ai-next-js-workshop-presentation.jpg",
    href: "/learn/workshops/claude-nextjs",
    isUpcoming: true,
  },
  {
    title: "MCP Deep Dive: Building Custom Integrations",
    description: "Master the Model Context Protocol and build powerful custom integrations for your AI tools.",
    date: "May 8, 2025",
    speaker: "Guest Expert",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/mcp-deep-dive",
    isUpcoming: true,
  },
  {
    title: "How B12 uses AI to generate and launch complete websites—live in under 60 seconds",
    description: "B12 co-founder Adam Marcus walks us through their powerful, flexible AI website builder.",
    date: "April 3, 2025",
    speaker: "Adam Marcus",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/b12-ai-websites",
    isUpcoming: false,
  },
  {
    title: "Building with Claude: From idea to production",
    description: "Learn how to take your AI projects from concept to launch using Claude as your coding partner.",
    date: "March 28, 2025",
    speaker: "Ben Tossell",
    speakerImage: "/ben-tossell-portrait.jpg",
    image: "/placeholder.svg",
    href: "/learn/workshops/building-with-claude",
    isUpcoming: false,
  },
  {
    title: "Cursor masterclass: Advanced techniques",
    description: "Deep dive into Cursor's most powerful features for building complex applications.",
    date: "March 20, 2025",
    speaker: "Sarah Chen",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/cursor-masterclass",
    isUpcoming: false,
  },
  {
    title: "AI agents workshop: Build your first agent",
    description: "Hands-on workshop where you'll build a functional AI agent from scratch.",
    date: "March 15, 2025",
    speaker: "Ben Tossell",
    speakerImage: "/ben-tossell-portrait.jpg",
    image: "/placeholder.svg",
    href: "/learn/workshops/ai-agents-workshop",
    isUpcoming: false,
  },
  {
    title: "No-code to AI-code: Your transition guide",
    description: "For no-code builders ready to level up with AI coding tools.",
    date: "March 8, 2025",
    speaker: "Shanice",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/nocode-to-aicode",
    isUpcoming: false,
  },
  {
    title: "Prompt engineering for developers",
    description: "Learn advanced prompting techniques to get better results from any AI model.",
    date: "March 1, 2025",
    speaker: "Keshav",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/prompt-engineering",
    isUpcoming: false,
  },
  {
    title: "Building a SaaS with Bolt and Replit",
    description: "Create a full SaaS application using AI-powered development tools.",
    date: "February 22, 2025",
    speaker: "Adam Tossell",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/saas-bolt-replit",
    isUpcoming: false,
  },
  {
    title: "Midjourney for product designers",
    description: "Learn how to use Midjourney to create stunning visuals for your products.",
    date: "February 15, 2025",
    speaker: "Guest Designer",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/midjourney-designers",
    isUpcoming: false,
  },
  {
    title: "ChatGPT plugins: Building and deploying",
    description: "Step-by-step guide to creating your own ChatGPT plugin.",
    date: "February 8, 2025",
    speaker: "Ben Tossell",
    speakerImage: "/ben-tossell-portrait.jpg",
    image: "/placeholder.svg",
    href: "/learn/workshops/chatgpt-plugins",
    isUpcoming: false,
  },
  {
    title: "The AI toolkit for entrepreneurs",
    description: "Essential AI tools every entrepreneur should be using in 2025.",
    date: "February 1, 2025",
    speaker: "Shanice",
    speakerImage: "/placeholder.svg",
    image: "/placeholder.svg",
    href: "/learn/workshops/ai-toolkit-entrepreneurs",
    isUpcoming: false,
  },
];

export default function WorkshopsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkshops = useMemo(() => {
    if (!searchQuery.trim()) return workshops;
    const query = searchQuery.toLowerCase();
    return workshops.filter(
      (w) =>
        w.title.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.speaker?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const upcomingWorkshops = filteredWorkshops.filter((w) => w.isUpcoming);
  const pastWorkshops = filteredWorkshops.filter((w) => !w.isUpcoming);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />

      <main className="pt-[80px] pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[12px] bg-violet-500/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-violet-500" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">Workshops</h1>
                <p className="text-[14px] text-text-secondary">Live sessions and recordings from our expert workshops</p>
              </div>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <LearnSearchInput
                placeholder="Search workshops..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <SortButton />
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-[13px] text-text-secondary mb-4">
              {filteredWorkshops.length} result{filteredWorkshops.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Upcoming Workshops */}
          {upcomingWorkshops.length > 0 && (
            <section className="mb-10">
              <h2 className="text-[18px] font-semibold text-text-primary mb-4">Upcoming</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingWorkshops.map((workshop) => (
                  <WorkshopCard key={workshop.title} {...workshop} />
                ))}
              </div>
            </section>
          )}

          {/* Past Workshops */}
          {pastWorkshops.length > 0 && (
            <section>
              <h2 className="text-[18px] font-semibold text-text-primary mb-4">Past Workshops</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastWorkshops.map((workshop) => (
                  <WorkshopCard key={workshop.title} {...workshop} />
                ))}
              </div>
            </section>
          )}

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-[14px]">No workshops found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
