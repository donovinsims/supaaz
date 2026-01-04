"use client";

import Image from "next/image";
import Link from "next/link";

interface WorkshopCardProps {
  title: string;
  description: string;
  date?: string;
  speaker?: string;
  speakerImage?: string;
  image?: string;
  href: string;
  isUpcoming?: boolean;
}

export function WorkshopCard({
  title,
  description,
  date,
  speaker,
  speakerImage,
  image,
  href,
  isUpcoming = false,
}: WorkshopCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="bg-ui-1 rounded-[16px] border border-border-1 overflow-hidden hover:border-border-3 hover:shadow-lg transition-all">
        {image && (
          <div className="aspect-video relative bg-ui-2">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
            {isUpcoming && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-500 text-white rounded-full">
                  Upcoming
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          {date && <p className="text-[12px] text-text-secondary mb-2">{date}</p>}
          <h3 className="text-[15px] font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-[13px] text-text-secondary line-clamp-2 mb-3">{description}</p>
          {speaker && (
            <div className="flex items-center gap-2">
              {speakerImage && (
                <Image
                  src={speakerImage || "/placeholder.svg"}
                  alt={speaker}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-[13px] text-text-secondary">{speaker}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
