"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Website, getRelatedWebsites } from '@/lib/data';
import { WebsitePreviewModal } from '@/components/ui/website-preview-modal';
import { BookmarkButton } from '@/components/ui/bookmark-button';

interface WebsiteDetailProps {
  website: Website;
}

const WebsiteDetail: React.FC<WebsiteDetailProps> = ({ website }) => {
  const relatedWebsites = getRelatedWebsites(website.slug, 4);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const layoutId = `preview-${website.slug}`;

  return (
    <div className="container pt-24 md:pt-32 pb-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        <div className="w-full lg:w-[60%]">
          <div className="relative">
              <motion.div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden"
              >
              <Image
                src={website.image}
                alt={website.title}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
            
            {website.mobileImage && (
              <div className="hidden md:block absolute bottom-4 right-4 w-[140px] lg:w-[180px] aspect-[9/16] rounded-[12px] overflow-hidden border border-border-1 bg-ui-1 shadow-2xl pointer-events-none">
                <Image
                  src={website.mobileImage}
                  alt={`${website.title} mobile`}
                  width={180}
                  height={320}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col">
          <div className="mb-6 md:mb-8">
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-text-primary tracking-tight leading-[1.1] uppercase mb-2 md:mb-4">
              {website.title}
            </h1>
            <p className="text-[16px] md:text-[20px] text-text-secondary leading-relaxed">
              {website.tagline}
            </p>
          </div>

          <div className="flex flex-col border-t border-border-1">
            <div className="flex items-center justify-between py-4 border-b border-border-1">
              <span className="text-[14px] text-text-secondary">Category:</span>
              <span className="text-[14px] font-medium text-text-primary">{website.category}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border-1">
              <span className="text-[14px] text-text-secondary">Framework:</span>
              <span className="text-[14px] font-medium text-text-primary">{website.framework}</span>
            </div>
            <div className="flex items-center justify-between py-4 border-b border-border-1">
              <span className="text-[14px] text-text-secondary">CMS:</span>
              <span className="text-[14px] font-medium text-text-primary">{website.cms}</span>
            </div>
          </div>

              <div className="flex flex-col gap-3 mt-6 md:mt-8">
                <motion.button
                  layoutId={layoutId}
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full py-4 bg-ui-1 hover:bg-ui-2 text-text-primary text-[14px] md:text-[16px] font-medium rounded-[12px] transition-colors text-center border border-border-1"
                >
                  Visit website
                </motion.button>
                <BookmarkButton websiteSlug={website.slug} />
              </div>
        </div>
      </div>

      {relatedWebsites.length > 0 && (
        <div className="mt-16 md:mt-24 pt-12 border-t border-border-1">
          <h2 className="text-[20px] md:text-[24px] font-bold text-text-primary mb-8">
            More in {website.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedWebsites.map((related) => (
              <Link 
                key={related.id} 
                href={`/website/${related.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[8px] border border-border-1 bg-ui-1 mb-3">
                  <Image
                    src={related.image}
                    alt={related.title}
                    width={400}
                    height={267}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium text-text-primary group-hover:text-text-primary/80 transition-colors truncate">
                    {related.title}
                  </span>
                  <span className="text-text-secondary/40 text-[14px]">·</span>
                  <span className="text-[14px] text-text-secondary truncate">{related.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <WebsitePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        layoutId={layoutId}
        website={{
          title: website.title,
          url: website.url,
          image: website.image,
        }}
      />
    </div>
  );
};

export default WebsiteDetail;
