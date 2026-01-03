"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 group cursor-pointer", className)}>
      <div className="relative w-7 h-7 bg-text-primary rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-4 h-4 text-page fill-current"
        >
          <path d="M12 0C12.8 8.5 15.5 11.2 24 12C15.5 12.8 12.8 15.5 12 24C11.2 15.5 8.5 12.8 0 12C8.5 11.2 11.2 8.5 12 0Z" />
        </svg>
      </div>
      <span className="text-text-primary font-bold text-[18px] tracking-tight transition-theme">
        Dark
      </span>
    </div>
  );
}
