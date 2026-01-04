"use client";

import Link from "next/link";

interface ArchiveCardProps {
  title: string;
  type: "Newsletter" | "Guide" | "Event Recap" | "News";
  date: string;
  href: string;
}

const typeColors: Record<string, { bg: string; text: string }> = {
  Newsletter: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  Guide: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  "Event Recap": { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400" },
  News: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400" },
};

export function ArchiveCard({ title, type, date, href }: ArchiveCardProps) {
  const colors = typeColors[type] || typeColors.Newsletter;

  return (
    <Link href={href} className="block group">
      <div className="bg-ui-1 rounded-[16px] border border-border-1 p-4 hover:border-border-3 hover:shadow-lg transition-all">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${colors.bg} ${colors.text}`}>
            {type}
          </span>
          <span className="text-[12px] text-text-secondary">{date}</span>
        </div>
        <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
      </div>
    </Link>
  );
}
