"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { PerkCard } from "@/components/learn/perk-card";
import { LearnSearchInput } from "@/components/learn/search-input";
import { SortButton } from "@/components/learn/sort-button";
import { Gift } from "lucide-react";

const perks = [
  {
    name: "Airtable",
    description: "$1,000 credit",
    icon: "/placeholder.svg",
    href: "/learn/perks/airtable",
  },
  {
    name: "Bolt",
    description: "3 months of pro for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/bolt",
  },
  {
    name: "Chatbase",
    description: "20% off for 12 months",
    icon: "/placeholder.svg",
    href: "/learn/perks/chatbase",
  },
  {
    name: "Clay",
    description: "3,000 free credits",
    icon: "/placeholder.svg",
    href: "/learn/perks/clay",
  },
  {
    name: "ClickUp",
    description: "20% off business and unlimited plans",
    icon: "/placeholder.svg",
    href: "/learn/perks/clickup",
  },
  {
    name: "Create",
    description: "3 months of pro for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/create",
  },
  {
    name: "Dub",
    description: "25% off first year",
    icon: "/placeholder.svg",
    href: "/learn/perks/dub",
  },
  {
    name: "Fathom",
    description: "3 months of premium for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/fathom",
  },
  {
    name: "Gamma",
    description: "3 months of pro for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/gamma",
  },
  {
    name: "Gemini",
    description: "10% off plus for 12 months",
    icon: "/google-gemini-sparkle-logo.jpg",
    href: "/learn/perks/gemini",
  },
  {
    name: "Gumloop",
    description: "15% off your first month",
    icon: "/placeholder.svg",
    href: "/learn/perks/gumloop",
  },
  {
    name: "Gusto",
    description: "3 months free",
    icon: "/placeholder.svg",
    href: "/learn/perks/gusto",
  },
  {
    name: "Hotjar",
    description: "First month free of business",
    icon: "/placeholder.svg",
    href: "/learn/perks/hotjar",
  },
  {
    name: "Hunter",
    description: "30% off for 3 months",
    icon: "/placeholder.svg",
    href: "/learn/perks/hunter",
  },
  {
    name: "Intercom",
    description: "First year free",
    icon: "/placeholder.svg",
    href: "/learn/perks/intercom",
  },
  {
    name: "Jotform",
    description: "50% off first year",
    icon: "/placeholder.svg",
    href: "/learn/perks/jotform",
  },
  {
    name: "Julius AI",
    description: "40% off any plan",
    icon: "/placeholder.svg",
    href: "/learn/perks/julius-ai",
  },
  {
    name: "Lindy",
    description: "20% extra credits",
    icon: "/placeholder.svg",
    href: "/learn/perks/lindy",
  },
  {
    name: "Linear",
    description: "2 months of basic or business for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/linear",
  },
  {
    name: "Lovable",
    description: "3 months of starter for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/lovable",
  },
  {
    name: "Mixpanel",
    description: "First year free",
    icon: "/placeholder.svg",
    href: "/learn/perks/mixpanel",
  },
  {
    name: "Monday.com",
    description: "First month free",
    icon: "/placeholder.svg",
    href: "/learn/perks/monday",
  },
  {
    name: "PDF.ai",
    description: "35% off for 12 months",
    icon: "/placeholder.svg",
    href: "/learn/perks/pdf-ai",
  },
  {
    name: "Replit",
    description: "40% off for 3 months or 3 free team seats",
    icon: "/replit-orange-logo.jpg",
    href: "/learn/perks/replit",
  },
  {
    name: "Semrush",
    description: "14-day pro free trial",
    icon: "/placeholder.svg",
    href: "/learn/perks/semrush",
  },
  {
    name: "Slack",
    description: "25% off pro for 1 year",
    icon: "/placeholder.svg",
    href: "/learn/perks/slack",
  },
  {
    name: "Superwhisper",
    description: "25% off pro",
    icon: "/placeholder.svg",
    href: "/learn/perks/superwhisper",
  },
  {
    name: "Tally",
    description: "50% off pro for 1 year",
    icon: "/placeholder.svg",
    href: "/learn/perks/tally",
  },
  {
    name: "Tella",
    description: "30% off for 1 year",
    icon: "/placeholder.svg",
    href: "/learn/perks/tella",
  },
  {
    name: "Todoist",
    description: "3 months of pro for free",
    icon: "/placeholder.svg",
    href: "/learn/perks/todoist",
  },
  {
    name: "Typeform",
    description: "6 months free on all plans",
    icon: "/placeholder.svg",
    href: "/learn/perks/typeform",
  },
  {
    name: "Zendesk",
    description: "6 months free",
    icon: "/placeholder.svg",
    href: "/learn/perks/zendesk",
  },
];

export default function PerksPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPerks = useMemo(() => {
    if (!searchQuery.trim()) return perks;
    const query = searchQuery.toLowerCase();
    return perks.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
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
              <div className="w-12 h-12 rounded-[12px] bg-amber-500/10 flex items-center justify-center">
                <Gift className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h1 className="text-[32px] font-bold text-text-primary tracking-tight">Perks</h1>
                <p className="text-[14px] text-text-secondary">All the perks you can access with a Pro plan</p>
              </div>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex-1">
              <LearnSearchInput
                placeholder="Search perks..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <SortButton />
          </div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-[13px] text-text-secondary mb-4">
              {filteredPerks.length} result{filteredPerks.length !== 1 ? "s" : ""} found
            </p>
          )}

          {/* Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPerks.map((perk) => (
              <PerkCard key={perk.name} {...perk} />
            ))}
          </div>

          {filteredPerks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-[14px]">No perks found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
