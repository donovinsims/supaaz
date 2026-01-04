"use client";

import Image from "next/image";
import Link from "next/link";

interface CourseButtonProps {
  name: string;
  icon: string;
  href: string;
}

export function CourseButton({ name, icon, href }: CourseButtonProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 px-4 py-3 bg-ui-1 border border-border-1 rounded-[12px] hover:border-border-3 hover:bg-ui-2 transition-all min-h-[48px]"
    >
      <Image src={icon || "/placeholder.svg"} alt={name} width={24} height={24} className="w-6 h-6 rounded" />
      <span className="text-[14px] font-medium text-text-primary">{name}</span>
    </Link>
  );
}
