"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Paywall } from './paywall';
import { BookmarkIconButton } from '@/components/ui/bookmark-icon-button';
import { useCategory } from '@/contexts/category-context';
import { createClient } from '@/lib/supabase/client';
import type { Submission } from '@/db/schema';

interface DirectoryCardProps {
  image: string;
  title: string;
  category: string;
  href: string;
  submissionId: string;
}

const DirectoryCard: React.FC<DirectoryCardProps> = ({ image, title, category, href, submissionId }) => {
  return (
    <div className="flex flex-col">
      <Link 
        href={href}
        className="group relative block overflow-hidden rounded-[8px] transition-all duration-300"
      >
        <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[8px] border border-border-1 bg-ui-1">
          {image && (
            <Image
              src={image}
              alt={title}
              width={400}
              height={267}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          )}
        </div>
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
            <BookmarkIconButton submissionId={submissionId} />
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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      let query = supabase
        .from("submissions")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (activeCategory !== 'all') {
        query = query.eq("category", activeCategory);
      }

      const { data, error } = await query.limit(32);

      if (error) {
        console.error("Error fetching submissions:", error);
      } else {
        setSubmissions(data as Submission[]);
      }
      setLoading(false);
    };

    fetchSubmissions();
  }, [activeCategory, supabase]);

  const directories: DirectoryCardProps[] = submissions.map((submission) => ({
    image: submission.images?.[1] || submission.images?.[2] || submission.images?.[0] || '',
    title: submission.title,
    category: submission.category,
    href: `/website/${submission.slug}`,
    submissionId: submission.id,
  }));

  if (loading) {
    return (
      <section className="bg-page pb-4 pt-2 transition-theme">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col">
                <div className="aspect-[1.5/1] w-full rounded-[8px] border border-border-1 bg-ui-1 animate-pulse" />
                <div className="mt-1.5 h-4 w-32 bg-ui-1 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (submissions.length === 0) {
    return (
      <section className="bg-page pb-4 pt-2 transition-theme">
        <div className="container">
          <div className="text-center py-16">
            <p className="text-text-secondary text-[15px]">No websites found in this category yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-page pb-4 pt-2 transition-theme">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {directories.slice(0, 32).map((item, index) => (
            <div 
              key={item.submissionId} 
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
