"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCategory } from "@/contexts/category-context";

const categories = [
  { name: "All", slug: "all" },
  { name: "Productivity", slug: "Productivity" },
  { name: "Utility", slug: "Utility" },
  { name: "Marketing", slug: "Marketing" },
  { name: "Design", slug: "Design" },
  { name: "AI", slug: "AI" },
  { name: "Content Creation", slug: "Content Creation" },
  { name: "Software", slug: "Software" },
];

export default function CategoryTabs() {
  const { activeCategory: activeTab, setActiveCategory: setActiveTab } = useCategory();

  return (
    <section className="w-full bg-page transition-theme pt-2 pb-4">
      <div className="container">
        <div className="relative">
          <div 
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar transition-all duration-300"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => {
              const isActive = activeTab === category.slug;

              return (
                <button
                  key={category.slug}
                  onClick={() => setActiveTab(category.slug)}
                  className={cn(
                    "whitespace-nowrap text-[12px] font-medium transition-all duration-300 px-[14px] py-[7px] rounded-[8px] border shrink-0",
                      isActive
                        ? "bg-ui-1 dark:bg-[#151515] border-border-1 dark:border-[#1F1F1F] text-text-primary dark:text-white"
                        : "bg-transparent border-transparent text-text-secondary hover:text-text-primary"
                  )}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-page to-transparent pointer-events-none md:hidden" />
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
