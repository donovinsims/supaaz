"use client";

import Image from "next/image";
import Link from "next/link";

interface TutorialCardProps {
  title: string;
  description: string;
  type: "Tutorial" | "Course" | "Guide" | "Newsletter" | "Event Recap" | "News";
  isPro?: boolean;
  tools?: { name: string; icon: string }[];
  href: string;
  accent?: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  Tutorial: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  Course: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  Guide: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  Newsletter: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  "Event Recap": { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400" },
  News: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400" },
};

const accentColors: Record<string, string> = {
  "bg-[#10b981]": "bg-emerald-500",
  "bg-[#3b82f6]": "bg-blue-500",
  "bg-[#8b5cf6]": "bg-violet-500",
  "bg-[#ec4899]": "bg-pink-500",
  "bg-[#f59e0b]": "bg-amber-500",
};

export function TutorialCard({
  title,
  description,
  type,
  isPro = false,
  tools = [],
  href,
  accent = "bg-[#10b981]",
}: TutorialCardProps) {
  const colors = typeColors[type] || typeColors.Tutorial;
  const accentColor = accentColors[accent] || "bg-primary";

  return (
    <Link href={href} className="block group">
      <div className="relative bg-ui-1 rounded-[16px] border border-border-1 overflow-hidden hover:border-border-3 transition-all hover:shadow-lg">
        {/* Colored left border accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor}`} />

        <div className="p-5 pl-6">
          {/* Tags */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 text-[11px] font-semibold ${colors.bg} ${colors.text} rounded-full`}>
              {type}
            </span>
            {isPro && (
              <span className="px-2.5 py-1 text-[11px] font-semibold bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full">
                Pro
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-[15px] font-semibold text-text-primary mb-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-text-secondary mb-3 line-clamp-2">{description}</p>

          {/* Tool icons */}
          {tools.length > 0 && (
            <div className="flex items-center gap-2">
              {tools.map((tool) => (
                <Image
                  key={tool.name}
                  src={tool.icon || "/placeholder.svg"}
                  alt={tool.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
