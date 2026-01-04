"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { TutorialCard } from "@/components/learn/tutorial-card";
import { CourseButton } from "@/components/learn/course-button";
import { LearnSearchInput } from "@/components/learn/search-input";
import { SortButton } from "@/components/learn/sort-button";
import { GraduationCap, BookOpen, Lightbulb, Archive, Video, Gift, Wrench, Users, ChevronRight } from "lucide-react";

const popularCourses = [
  { name: "ChatGPT", icon: "/chatgpt-green-logo.jpg", href: "/learn/chatgpt" },
  { name: "Claude", icon: "/claude-ai-anthropic-logo.jpg", href: "/learn/claude" },
  { name: "Google Gemini", icon: "/google-gemini-sparkle-logo.jpg", href: "/learn/gemini" },
  { name: "Microsoft Copilot", icon: "/microsoft-copilot-colorful-logo.jpg", href: "/learn/copilot" },
  { name: "Midjourney", icon: "/midjourney-sailboat-logo.jpg", href: "/learn/midjourney" },
];

const quickLinks = [
  { name: "Archive", description: "Browse past newsletters and content", href: "/learn/archive", icon: Archive, color: "bg-blue-500/10 text-blue-500" },
  { name: "Workshops", description: "Live sessions and recordings", href: "/learn/workshops", icon: Video, color: "bg-violet-500/10 text-violet-500" },
  { name: "Perks", description: "Exclusive member discounts", href: "/learn/perks", icon: Gift, color: "bg-amber-500/10 text-amber-500" },
  { name: "Tools", description: "Discover AI tools", href: "/learn/tools", icon: Wrench, color: "bg-emerald-500/10 text-emerald-500" },
  { name: "About", description: "Meet the team", href: "/learn/about", icon: Users, color: "bg-pink-500/10 text-pink-500" },
];

const tutorials = [
  {
    title: "Use fine-tuning to give OpenAI's language models a distinct voice",
    description: "How to fine tune OpenAI's models on specific writing styles.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "OpenAI", icon: "/openai-logo-inspired-abstract.png" },
      { name: "API", icon: "/code-api-icon.jpg" },
    ],
    href: "/learn/fine-tuning-openai",
    accent: "bg-[#10b981]",
  },
  {
    title: "Use Grok 3 DeepSearch to do product research on X",
    description: "How to use Grok 3's DeepSearch more to do detailed product research.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [{ name: "Grok", icon: "/grok-x-logo.jpg" }],
    href: "/learn/grok-deepsearch",
    accent: "bg-[#10b981]",
  },
  {
    title: "Build a Chrome extension with Claude",
    description: "Learn how to build browser extensions using Claude as your AI coding assistant.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "Claude", icon: "/abstract-ai-logo.png" },
      { name: "Chrome", icon: "/chrome-browser-logo.jpg" },
    ],
    href: "/learn/chrome-extension-claude",
    accent: "bg-[#10b981]",
  },
  {
    title: "Master ChatGPT prompting",
    description: "Learn the fundamentals of effective prompting with ChatGPT.",
    type: "Course" as const,
    isPro: false,
    tools: [{ name: "ChatGPT", icon: "/chatgpt-logo-inspired.png" }],
    href: "/learn/chatgpt-prompting",
    accent: "bg-[#3b82f6]",
  },
  {
    title: "Introduction to AI agents",
    description: "Understand how AI agents work and how to build your own.",
    type: "Course" as const,
    isPro: true,
    tools: [{ name: "AI", icon: "/ai-robot-icon.png" }],
    href: "/learn/ai-agents",
    accent: "bg-[#8b5cf6]",
  },
  {
    title: "Use Cursor to build your first app",
    description: "Step-by-step guide to building applications with Cursor AI.",
    type: "Tutorial" as const,
    isPro: false,
    tools: [{ name: "Cursor", icon: "/cursor-ai-logo.png" }],
    href: "/learn/cursor-first-app",
    accent: "bg-[#10b981]",
  },
  {
    title: "Build a SaaS landing page with v0",
    description: "Create beautiful landing pages using Vercel's v0 AI tool.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "v0", icon: "/vercel-v0-logo.png" },
      { name: "Vercel", icon: "/vercel-black-logo.jpg" },
    ],
    href: "/learn/v0-landing-page",
    accent: "bg-[#10b981]",
  },
  {
    title: "Automate your workflow with Zapier AI",
    description: "Learn how to use Zapier's AI features to automate repetitive tasks.",
    type: "Tutorial" as const,
    isPro: false,
    tools: [{ name: "Zapier", icon: "/zapier-orange-logo.jpg" }],
    href: "/learn/zapier-ai-automation",
    accent: "bg-[#10b981]",
  },
  {
    title: "Create stunning images with Midjourney v6",
    description: "Master the art of AI image generation with Midjourney's latest version.",
    type: "Course" as const,
    isPro: true,
    tools: [{ name: "Midjourney", icon: "/generic-abstract-logo.png" }],
    href: "/learn/midjourney-v6",
    accent: "bg-[#ec4899]",
  },
  {
    title: "Build a chatbot with the OpenAI API",
    description: "Create your own AI chatbot using OpenAI's powerful API.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "OpenAI", icon: "/openai-logo-inspired-abstract.png" },
      { name: "Node.js", icon: "/node-js-green-logo.jpg" },
    ],
    href: "/learn/openai-chatbot",
    accent: "bg-[#10b981]",
  },
  {
    title: "Notion AI for productivity",
    description: "Supercharge your Notion workspace with AI-powered features.",
    type: "Guide" as const,
    isPro: false,
    tools: [{ name: "Notion", icon: "/notion-logo-black.jpg" }],
    href: "/learn/notion-ai-productivity",
    accent: "bg-[#f59e0b]",
  },
  {
    title: "Build an AI-powered blog with Next.js",
    description: "Create a blog that uses AI to generate content suggestions and summaries.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "Next.js", icon: "/next-js-black-logo.jpg" },
      { name: "Claude", icon: "/abstract-ai-logo.png" },
    ],
    href: "/learn/ai-blog-nextjs",
    accent: "bg-[#10b981]",
  },
  {
    title: "Perplexity for research",
    description: "Use Perplexity AI to supercharge your research workflow.",
    type: "Guide" as const,
    isPro: false,
    tools: [{ name: "Perplexity", icon: "/perplexity-ai-logo.png" }],
    href: "/learn/perplexity-research",
    accent: "bg-[#f59e0b]",
  },
  {
    title: "Deploy AI apps on Replit",
    description: "Learn how to build and deploy AI-powered applications on Replit.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [{ name: "Replit", icon: "/replit-orange-logo.jpg" }],
    href: "/learn/replit-ai-apps",
    accent: "bg-[#10b981]",
  },
  {
    title: "Claude for coding: Complete guide",
    description: "Everything you need to know about using Claude as your coding assistant.",
    type: "Course" as const,
    isPro: true,
    tools: [{ name: "Claude", icon: "/abstract-ai-logo.png" }],
    href: "/learn/claude-coding-guide",
    accent: "bg-[#8b5cf6]",
  },
  {
    title: "Build a Slack bot with AI",
    description: "Create an intelligent Slack bot that can answer questions and automate tasks.",
    type: "Tutorial" as const,
    isPro: true,
    tools: [
      { name: "Slack", icon: "/slack-colorful-logo.jpg" },
      { name: "OpenAI", icon: "/openai-logo-inspired-abstract.png" },
    ],
    href: "/learn/ai-slack-bot",
    accent: "bg-[#10b981]",
  },
];

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = useMemo(() => {
    if (!searchQuery.trim()) return tutorials;
    const query = searchQuery.toLowerCase();
    return tutorials.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.type.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      
      <main className="pt-[80px] pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[12px] bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">Learn AI</h1>
                <p className="text-[14px] text-text-secondary">Master AI tools with bite-sized tutorials and courses</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <section className="mb-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group bg-ui-1 border border-border-1 rounded-[12px] p-4 hover:border-border-3 hover:shadow-lg transition-all"
                >
                  <div className={`w-10 h-10 rounded-[10px] ${link.color.split(" ")[0]} flex items-center justify-center mb-3`}>
                    <link.icon className={`w-5 h-5 ${link.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-text-primary group-hover:text-primary transition-colors flex items-center gap-1">
                    {link.name}
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-[11px] text-text-secondary mt-0.5">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[24px] font-bold text-text-primary">500+</p>
              <p className="text-[12px] text-text-secondary">Tutorials</p>
            </div>
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-[24px] font-bold text-text-primary">50+</p>
              <p className="text-[12px] text-text-secondary">Courses</p>
            </div>
            <div className="bg-ui-1 border border-border-1 rounded-[16px] p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-[24px] font-bold text-text-primary">100+</p>
              <p className="text-[12px] text-text-secondary">Guides</p>
            </div>
          </div>

          {/* Most Popular Courses */}
          <section className="mb-10">
            <h2 className="text-[18px] font-semibold text-text-primary mb-4">Most popular courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {popularCourses.map((course) => (
                <CourseButton key={course.name} {...course} />
              ))}
            </div>
          </section>

          {/* Browse All */}
          <section>
            <h2 className="text-[18px] font-semibold text-text-primary mb-4">Browse all courses & tutorials</h2>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex-1">
                <LearnSearchInput 
                  placeholder="Search tutorials, courses, and guides..." 
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <SortButton />
            </div>

            {/* Results count */}
            {searchQuery && (
              <p className="text-[13px] text-text-secondary mb-4">
                {filteredTutorials.length} result{filteredTutorials.length !== 1 ? "s" : ""} found
              </p>
            )}

            {/* Tutorial Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.title} {...tutorial} />
              ))}
            </div>

            {filteredTutorials.length === 0 && (
              <div className="text-center py-16">
                <p className="text-text-secondary text-[14px]">No tutorials found matching "{searchQuery}"</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
