"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { ToolCard } from "@/components/learn/tool-card";
import { LearnSearchInput } from "@/components/learn/search-input";
import { SortButton } from "@/components/learn/sort-button";
import { Wrench } from "lucide-react";

const tools = [
  {
    name: "ChatGPT",
    description: "OpenAI's conversational AI assistant for writing, analysis, and coding.",
    icon: "/chatgpt-green-logo.jpg",
    category: "AI Assistant",
    href: "/learn/tools/chatgpt",
  },
  {
    name: "Claude",
    description: "Anthropic's AI assistant known for thoughtful, nuanced responses.",
    icon: "/claude-ai-anthropic-logo.jpg",
    category: "AI Assistant",
    href: "/learn/tools/claude",
  },
  {
    name: "Gemini",
    description: "Google's multimodal AI for text, image, and code generation.",
    icon: "/google-gemini-sparkle-logo.jpg",
    category: "AI Assistant",
    href: "/learn/tools/gemini",
  },
  {
    name: "Microsoft Copilot",
    description: "AI assistant integrated across Microsoft's product suite.",
    icon: "/microsoft-copilot-colorful-logo.jpg",
    category: "AI Assistant",
    href: "/learn/tools/copilot",
  },
  {
    name: "Grok",
    description: "xAI's conversational AI with real-time X/Twitter integration.",
    icon: "/placeholder.svg",
    category: "AI Assistant",
    href: "/learn/tools/grok",
  },
  {
    name: "Cursor",
    description: "AI-powered code editor that helps you write code faster.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/cursor",
  },
  {
    name: "Replit",
    description: "Browser-based IDE with AI-powered coding assistance.",
    icon: "/replit-orange-logo.jpg",
    category: "Coding",
    href: "/learn/tools/replit",
  },
  {
    name: "Bolt",
    description: "Build full-stack web apps with natural language prompts.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/bolt",
  },
  {
    name: "Lovable",
    description: "AI-powered app builder for creating web applications.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/lovable",
  },
  {
    name: "v0",
    description: "Vercel's AI-powered UI generation tool.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/v0",
  },
  {
    name: "Windsurf",
    description: "AI-powered code editor from Codeium with agentic features.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/windsurf",
  },
  {
    name: "Devin",
    description: "The first AI software engineer that can handle complex coding tasks.",
    icon: "/placeholder.svg",
    category: "Coding",
    href: "/learn/tools/devin",
  },
  {
    name: "Midjourney",
    description: "AI image generation tool for creating stunning visuals.",
    icon: "/midjourney-sailboat-logo.jpg",
    category: "Image Generation",
    href: "/learn/tools/midjourney",
  },
  {
    name: "DALL-E 3",
    description: "OpenAI's latest image generation model with improved accuracy.",
    icon: "/placeholder.svg",
    category: "Image Generation",
    href: "/learn/tools/dalle",
  },
  {
    name: "Stable Diffusion",
    description: "Open-source AI image generation with customizable models.",
    icon: "/placeholder.svg",
    category: "Image Generation",
    href: "/learn/tools/stable-diffusion",
  },
  {
    name: "Leonardo AI",
    description: "AI-powered creative platform for game assets and graphics.",
    icon: "/placeholder.svg",
    category: "Image Generation",
    href: "/learn/tools/leonardo",
  },
  {
    name: "Perplexity",
    description: "AI-powered search engine that provides sourced answers.",
    icon: "/placeholder.svg",
    category: "Research",
    href: "/learn/tools/perplexity",
  },
  {
    name: "Elicit",
    description: "AI research assistant for analyzing academic papers.",
    icon: "/placeholder.svg",
    category: "Research",
    href: "/learn/tools/elicit",
  },
  {
    name: "Notion AI",
    description: "AI writing assistant integrated into the Notion workspace.",
    icon: "/placeholder.svg",
    category: "Productivity",
    href: "/learn/tools/notion-ai",
  },
  {
    name: "Gamma",
    description: "AI-powered presentation and document creation tool.",
    icon: "/placeholder.svg",
    category: "Productivity",
    href: "/learn/tools/gamma",
  },
  {
    name: "Otter.ai",
    description: "AI meeting assistant that transcribes and summarizes.",
    icon: "/placeholder.svg",
    category: "Productivity",
    href: "/learn/tools/otter",
  },
  {
    name: "Fathom",
    description: "AI note-taker that records and transcribes meetings.",
    icon: "/placeholder.svg",
    category: "Productivity",
    href: "/learn/tools/fathom",
  },
  {
    name: "Zapier",
    description: "Automation platform connecting apps with AI capabilities.",
    icon: "/zapier-orange-logo.jpg",
    category: "Automation",
    href: "/learn/tools/zapier",
  },
  {
    name: "Make",
    description: "Visual automation platform with AI integrations.",
    icon: "/placeholder.svg",
    category: "Automation",
    href: "/learn/tools/make",
  },
  {
    name: "Runway",
    description: "AI-powered video editing and generation platform.",
    icon: "/placeholder.svg",
    category: "Video",
    href: "/learn/tools/runway",
  },
  {
    name: "Sora",
    description: "OpenAI's text-to-video generation model.",
    icon: "/placeholder.svg",
    category: "Video",
    href: "/learn/tools/sora",
  },
  {
    name: "ElevenLabs",
    description: "AI voice synthesis and cloning platform.",
    icon: "/placeholder.svg",
    category: "Audio",
    href: "/learn/tools/elevenlabs",
  },
  {
    name: "Suno",
    description: "AI music generation platform for creating songs.",
    icon: "/placeholder.svg",
    category: "Audio",
    href: "/learn/tools/suno",
  },
];

const categories = [
  "All",
  "AI Assistant",
  "Coding",
  "Image Generation",
  "Research",
  "Productivity",
  "Automation",
  "Video",
  "Audio",
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = useMemo(() => {
    let filtered = tools;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />

      <main className="pt-[80px] pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[12px] bg-emerald-500/10 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">Tools</h1>
                <p className="text-[14px] text-text-secondary">Discover the best AI tools for building and creating</p>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-ui-1 border border-border-1 text-text-secondary hover:text-text-primary hover:border-border-3"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <LearnSearchInput
                placeholder="Search tools..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <SortButton />
          </div>

          {/* Results count */}
          {(searchQuery || selectedCategory !== "All") && (
            <p className="text-[13px] text-text-secondary mb-4">
              {filteredTools.length} result{filteredTools.length !== 1 ? "s" : ""} found
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          )}

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-[14px]">
                No tools found{searchQuery ? ` matching "${searchQuery}"` : ""}
                {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
