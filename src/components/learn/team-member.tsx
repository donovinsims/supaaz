"use client";

import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
}

export function TeamMember({ name, role, description, image }: TeamMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-ui-2">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-[16px] font-semibold text-text-primary">{name}</h3>
      <p className="text-[13px] text-primary font-medium mb-2">{role}</p>
      <p className="text-[13px] text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
