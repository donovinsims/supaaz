"use client";

import { ChevronDown, Filter } from "lucide-react";

export function SortButton() {
  return (
    <button className="flex items-center justify-center gap-2 px-4 py-3 bg-ui-1 border border-border-1 rounded-[12px] hover:bg-ui-2 hover:border-border-3 transition-all min-h-[48px]">
      <Filter className="w-4 h-4 text-text-secondary" />
      <span className="text-[14px] font-medium text-text-primary">Filter & Sort</span>
      <ChevronDown className="w-4 h-4 text-text-secondary" />
    </button>
  );
}
