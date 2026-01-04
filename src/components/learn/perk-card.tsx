"use client";

import Image from "next/image";
import Link from "next/link";

interface PerkCardProps {
  name: string;
  description: string;
  icon: string;
  href: string;
}

export function PerkCard({ name, description, icon, href }: PerkCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-ui-1 rounded-[16px] border border-border-1 p-4 hover:border-border-3 hover:shadow-lg transition-all flex items-center gap-4">
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
          <h3 className="text-[15px] font-semibold text-text-primary group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-[13px] text-text-secondary truncate">{description}</p>
        </div>
      </div>
    </Link>
  );
}
