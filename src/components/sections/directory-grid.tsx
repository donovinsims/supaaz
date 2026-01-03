"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Paywall } from './paywall';
import { BookmarkIconButton } from '@/components/ui/bookmark-icon-button';
import { websites } from '@/lib/data';
import { useCategory } from '@/contexts/category-context';

interface DirectoryCardProps {
  image: string;
  badge?: 'Featured' | 'Popular' | 'New' | string;
  title: string;
  category: string;
  href: string;
  slug: string;
}

const DirectoryCard: React.FC<DirectoryCardProps> = ({ image, badge, title, category, href, slug }) => {
  return (
    <div className="flex flex-col">
      <Link 
        href={href}
        className="group relative block overflow-hidden rounded-[8px] transition-all duration-300"
      >
        <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[8px] border border-border-1 bg-ui-1">
          </div>
      
          {badge && (
            <div className="absolute top-3 right-3 z-10">
              <div className="rounded-[6px] bg-black/50 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/10">
                {badge}
              </div>
            </div>
          )}
      </Link>
      
      <div className="mt-1.5 flex items-center justify-between px-0.5">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <Link 
            href={href} 
            className="text-[14px] font-medium text-text-primary hover:text-text-primary/80 transition-colors truncate"
          >
            {title}
          </Link>
          <span className="text-text-secondary/40 text-[14px]">·</span>
          <span className="text-[14px] text-text-secondary truncate">{category}</span>
        </div>
        
          <div className="flex items-center gap-3 ml-2 shrink-0">
            <BookmarkIconButton websiteSlug={slug} />
            <Link href={href} className="text-text-secondary hover:text-text-primary transition-colors">
              <ArrowUpRight className="h-[16px] w-[16px]" strokeWidth={2.5} />
            </Link>
          </div>
      </div>
    </div>
  );
};

const DirectoryGrid: React.FC = () => {
  const { activeCategory } = useCategory();
  
  const filteredWebsites = activeCategory === 'all' 
    ? websites 
    : websites.filter(w => w.category === activeCategory);

  const directories: DirectoryCardProps[] = filteredWebsites.map((website) => ({
    image: website.image,
    badge: website.badge,
    title: website.title,
    category: website.category,
    href: `/website/${website.slug}`,
    slug: website.slug,
  }));

  return (
    <section className="bg-page pb-4 pt-2 transition-theme">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {directories.slice(0, 32).map((item, index) => (
            <div 
              key={index} 
                className={index >= 11 ? "hidden sm:block" : "block"}
            >
              <DirectoryCard {...item} />
            </div>
          ))}
        </div>
      </div>
      
      <Paywall />
    </section>
  );
};
  
export default DirectoryGrid;
