"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Shuffle, Users, ExternalLink } from 'lucide-react';
import { creators, Creator } from '@/lib/data';

const CreatorCard = ({ creator }: { creator: Creator }) => {
  return (
    <Link href={`/creators/${creator.slug}`} className="flex flex-col gap-5 p-6 bg-ui-1 border border-border-1 rounded-[20px] hover:border-border-2 transition-all group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-border-1 shrink-0">
            <Image 
              src={creator.avatar} 
              alt={creator.name} 
              width={56} 
              height={56} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[16px] font-semibold text-text-primary group-hover:opacity-80 transition-opacity">
              {creator.name}
            </h3>
            <p className="text-[13px] text-text-tertiary">
              {creator.category}
            </p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors shrink-0 mt-1" />
      </div>
      
      <p className="text-[14px] text-text-secondary leading-relaxed line-clamp-2">
        {creator.seoShortDescription}
      </p>

        <div className="flex flex-wrap gap-2">
          {creator.targetAudience.slice(0, 3).map((audience, i) => (
            <span 
              key={i}
              className="px-2.5 py-1 text-[11px] text-text-tertiary bg-ui-2 rounded-[6px]"
            >
              {audience}
            </span>
          ))}
        </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-1">
        <div className="flex items-center gap-4">
          {creator.newsletterSubscribers && (
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[12px] font-medium">{creator.newsletterSubscribers}</span>
            </div>
          )}
        </div>
        {creator.notableMetrics && (
          <span className="text-[11px] text-text-tertiary font-medium truncate max-w-[180px]">
            {creator.notableMetrics.split('|')[0].trim()}
          </span>
        )}
      </div>
    </Link>
  );
};

const CreatorsGrid = () => {
  const categories = useMemo(() => {
    const cats = new Set(creators.map(c => c.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const [filter, setFilter] = useState<string>('All');
  const [shuffledCreators, setShuffledCreators] = useState<Creator[]>(creators);

  const handleShuffle = () => {
    setShuffledCreators(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const filteredCreators = shuffledCreators.filter(c => {
    if (filter === 'All') return true;
    return c.category === filter;
  });

  return (
    <section className="bg-page pb-24 transition-theme">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-1 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all whitespace-nowrap ${
                  filter === cat 
                    ? 'text-text-primary bg-ui-1 border border-border-1' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button 
            onClick={handleShuffle}
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-text-primary bg-ui-1 border border-border-1 rounded-[8px] hover:bg-ui-2 transition-all self-start md:self-auto"
          >
            <Shuffle className="w-4 h-4" />
            <span>Shuffle</span>
          </button>
        </div>

        <div className="text-[14px] text-text-tertiary">
          Showing {filteredCreators.length} creator{filteredCreators.length !== 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorsGrid;
