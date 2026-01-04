"use client";

import Image from "next/image";
import Link from "next/link";

interface ToolCardProps {
  name: string;
  description: string;
  icon: string;
  category: string;
  href: string;
}

export function ToolCard({ name, description, icon, category, href }: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-ui-1 rounded-[16px] border border-border-1 p-4 hover:border-border-3 hover:shadow-lg transition-all h-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-[12px] overflow-hidden flex-shrink-0 bg-ui-2 flex items-center justify-center">
            <Image
              src={icon || "/placeholder.svg"}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">
                {name}
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-ui-2 text-text-secondary rounded-full">
                {category}
              </span>
            </div>
            <p className="text-[13px] text-text-secondary line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
