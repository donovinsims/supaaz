"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Submission } from '@/db/schema';
import { WebsitePreviewModal } from '@/components/ui/website-preview-modal';
import { BookmarkButton } from '@/components/ui/bookmark-button';
import { ReviewSection } from './review-section';

interface WebsiteDetailProps {
  submission: Submission;
  relatedSubmissions: Submission[];
}

const WebsiteDetail: React.FC<WebsiteDetailProps> = ({ submission, relatedSubmissions }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const layoutId = `preview-${submission.slug}`;

  const primaryImage = submission.images?.[1] || submission.images?.[2] || submission.images?.[0] || '/placeholder.png';

  return (
    <div className="container pt-24 md:pt-32 pb-24">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        <div className="w-full lg:w-[60%]">
          <div className="relative">
              <motion.div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden"
              >
              <Image
                src={primaryImage}
                alt={submission.title}
                width={1200}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex flex-col">
          <div className="mb-6 md:mb-8">
            <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-text-primary tracking-tight leading-[1.1] uppercase mb-2 md:mb-4">
              {submission.title}
            </h1>
            <p className="text-[16px] md:text-[20px] text-text-secondary leading-relaxed">
              {submission.tagline || submission.description}
            </p>
          </div>

          <div className="flex flex-col border-t border-border-1">
            <div className="flex items-center justify-between py-4 border-b border-border-1">
              <span className="text-[14px] text-text-secondary">Category:</span>
              <span className="text-[14px] font-medium text-text-primary">{submission.category}</span>
            </div>
            {submission.framework && (
              <div className="flex items-center justify-between py-4 border-b border-border-1">
                <span className="text-[14px] text-text-secondary">Framework:</span>
                <span className="text-[14px] font-medium text-text-primary">{submission.framework}</span>
              </div>
            )}
            {submission.cms && (
              <div className="flex items-center justify-between py-4 border-b border-border-1">
                <span className="text-[14px] text-text-secondary">CMS:</span>
                <span className="text-[14px] font-medium text-text-primary">{submission.cms}</span>
              </div>
            )}
          </div>

          {submission.description && (
            <div className="mt-6">
              <p className="text-[14px] text-text-secondary leading-relaxed">
                {submission.description}
              </p>
            </div>
          )}

              <div className="flex flex-col gap-3 mt-6 md:mt-8">
                <motion.button
                  layoutId={layoutId}
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full py-4 bg-ui-1 hover:bg-ui-2 text-text-primary text-[14px] md:text-[16px] font-medium rounded-[12px] transition-colors text-center border border-border-1"
                >
                  Visit website
                </motion.button>
                <BookmarkButton submissionId={submission.id} />
              </div>
        </div>
      </div>

      <ReviewSection submissionId={submission.id} />

      {relatedSubmissions.length > 0 && (
        <div className="mt-16 md:mt-24 pt-12 border-t border-border-1">
          <h2 className="text-[20px] md:text-[24px] font-bold text-text-primary mb-8">
            More in {submission.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedSubmissions.map((related) => (
                <Link 
                  key={related.id} 
                  href={`/website/${related.slug}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[1.5/1] w-full overflow-hidden rounded-[8px] border border-border-1 bg-ui-1 mb-3">
                    <Image
                      src={related.images?.[1] || related.images?.[2] || related.images?.[0] || '/placeholder.png'}
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
          title: submission.title,
          url: submission.url,
          image: primaryImage,
        }}
      />
    </div>
  );
};

export default WebsiteDetail;
