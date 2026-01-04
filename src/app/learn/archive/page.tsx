"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { ArchiveCard } from "@/components/learn/archive-card";
import { LearnSearchInput } from "@/components/learn/search-input";
import { SortButton } from "@/components/learn/sort-button";
import { Archive } from "lucide-react";

const archiveItems = [
  {
    title: "BB Digest: Rise of agentic models PLUS: How I build with MCP",
    type: "Newsletter" as const,
    date: "April 17, 2025",
    href: "/learn/archive/bb-digest-agentic-models",
  },
  {
    title: "The rise of the one-person product team",
    type: "News" as const,
    date: "April 17, 2025",
    href: "/learn/archive/one-person-product-team",
  },
  {
    title: "BB Digest: Disappointing memories PLUS: visualize your ChatGPT history",
    type: "Newsletter" as const,
    date: "April 15, 2025",
    href: "/learn/archive/bb-digest-chatgpt-history",
  },
  {
    title: "BB Digest: Make an app with Gemini PLUS: Should you care about MCP?",
    type: "Newsletter" as const,
    date: "April 10, 2025",
    href: "/learn/archive/bb-digest-gemini-mcp",
  },
  {
    title: "Dear Ben… What is MCP (Model Context Protocol)?",
    type: "Guide" as const,
    date: "April 10, 2025",
    href: "/learn/archive/what-is-mcp",
  },
  {
    title: "Why everyone's talking about AI agents",
    type: "Guide" as const,
    date: "April 10, 2025",
    href: "/learn/archive/ai-agents-explained",
  },
  {
    title: "BB Digest: Llama 4 sucks PLUS: Devin gets cheaper, Shopify CEO on AI",
    type: "Newsletter" as const,
    date: "April 8, 2025",
    href: "/learn/archive/bb-digest-llama-4",
  },
  {
    title: "A quick demo of Subframe",
    type: "Guide" as const,
    date: "April 8, 2025",
    href: "/learn/archive/subframe-demo",
  },
  {
    title: "Reflexive AI use isn't optional anymore",
    type: "News" as const,
    date: "April 8, 2025",
    href: "/learn/archive/reflexive-ai-use",
  },
  {
    title: "BB Digest: Professor Claude PLUS: there's an agent outbreak",
    type: "Newsletter" as const,
    date: "April 3, 2025",
    href: "/learn/archive/bb-digest-professor-claude",
  },
  {
    title: "How B12 uses AI to generate and launch complete websites—live in under 60 seconds",
    type: "Event Recap" as const,
    date: "April 3, 2025",
    href: "/learn/archive/b12-ai-websites",
  },
  {
    title: "BB Digest: Is OpenAI open again? PLUS: We can finally talk to our dogs",
    type: "Newsletter" as const,
    date: "April 1, 2025",
    href: "/learn/archive/bb-digest-openai-open",
  },
  {
    title: "BB Digest: When prompting killed Photoshop PLUS: I battled 4 coding tools against each other",
    type: "Newsletter" as const,
    date: "March 27, 2025",
    href: "/learn/archive/bb-digest-coding-tools-battle",
  },
  {
    title: "AI coding tools: Head-to-head",
    type: "Guide" as const,
    date: "March 27, 2025",
    href: "/learn/archive/ai-coding-tools-comparison",
  },
  {
    title: "BB Digest: GPT-5 rumors are heating up PLUS: New Claude features",
    type: "Newsletter" as const,
    date: "March 25, 2025",
    href: "/learn/archive/bb-digest-gpt5-rumors",
  },
  {
    title: "The complete guide to prompt engineering",
    type: "Guide" as const,
    date: "March 25, 2025",
    href: "/learn/archive/prompt-engineering-guide",
  },
  {
    title: "BB Digest: Anthropic's new model PLUS: Building with AI in 2025",
    type: "Newsletter" as const,
    date: "March 20, 2025",
    href: "/learn/archive/bb-digest-anthropic-new-model",
  },
  {
    title: "How startups are using AI to 10x their productivity",
    type: "News" as const,
    date: "March 20, 2025",
    href: "/learn/archive/startups-ai-productivity",
  },
  {
    title: "BB Digest: Cursor vs Windsurf PLUS: The AI coding war heats up",
    type: "Newsletter" as const,
    date: "March 18, 2025",
    href: "/learn/archive/bb-digest-cursor-vs-windsurf",
  },
  {
    title: "Workshop recap: Building your first AI agent",
    type: "Event Recap" as const,
    date: "March 18, 2025",
    href: "/learn/archive/workshop-first-ai-agent",
  },
  {
    title: "BB Digest: Google I/O AI announcements PLUS: What matters for builders",
    type: "Newsletter" as const,
    date: "March 15, 2025",
    href: "/learn/archive/bb-digest-google-io",
  },
  {
    title: "The non-technical founder's guide to AI tools",
    type: "Guide" as const,
    date: "March 15, 2025",
    href: "/learn/archive/nontechnical-founder-ai-guide",
  },
  {
    title: "BB Digest: Midjourney v7 is here PLUS: Image generation goes next level",
    type: "Newsletter" as const,
    date: "March 13, 2025",
    href: "/learn/archive/bb-digest-midjourney-v7",
  },
  {
    title: "Why your AI project is failing (and how to fix it)",
    type: "News" as const,
    date: "March 13, 2025",
    href: "/learn/archive/ai-project-failing",
  },
  {
    title: "BB Digest: The state of AI in 2025 PLUS: Predictions for Q2",
    type: "Newsletter" as const,
    date: "March 10, 2025",
    href: "/learn/archive/bb-digest-state-of-ai-2025",
  },
];

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return archiveItems;
    const query = searchQuery.toLowerCase();
    return archiveItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />

      <main className="pt-[80px] pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[12px] bg-blue-500/10 flex items-center justify-center">
                <Archive className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">Archive</h1>
                <p className="text-[14px] text-text-secondary">Browse our newsletter archive and past content</p>
              </div>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <LearnSearchInput
                placeholder="Search archive..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <SortButton />
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-[13px] text-text-secondary mb-4">
              {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Archive Items */}
          <div className="flex flex-col gap-4">
            {filteredItems.map((item) => (
              <ArchiveCard key={item.title} {...item} />
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-[14px]">No archive items found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
