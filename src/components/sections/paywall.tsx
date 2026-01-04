"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Monitor, Bookmark, Percent, Smile } from 'lucide-react';
import { useAuthModal } from '@/contexts/auth-modal-context';

export const SignupCard: React.FC = () => {
  const { openAuthModal } = useAuthModal();

  return (
    <div className="relative z-20 mx-auto w-full max-w-[480px] overflow-hidden rounded-[16px] border border-border-1 bg-ui-1/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-10 md:p-12">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-4 text-[26px] sm:text-[32px] font-bold uppercase tracking-tight text-text-primary leading-tight">
          Unlock Everything
        </h2>
        <p className="mb-6 sm:mb-8 text-[14px] leading-relaxed text-text-secondary">
          Get all features for only <span className="font-semibold text-text-primary">$19 per year.</span>
          <br />
          Cancel any time.{' '}
          <a href="/pricing" className="text-text-primary underline underline-offset-4 hover:opacity-80 transition-opacity">
            Read more
          </a>
        </p>

        <div className="mb-6 sm:mb-8 w-full space-y-3 sm:space-y-5 text-left">
          <div className="flex items-center gap-4 group">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
              <Lock className="h-4 w-4" />
            </div>
            <p className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">
              Access full directory <span className="opacity-50 group-hover:opacity-100 transition-opacity">of all websites</span>
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
              <Monitor className="h-4 w-4" />
            </div>
            <p className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">
              <span className="font-medium text-text-primary">Mobile & desktop</span> website previews
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
              <Bookmark className="h-4 w-4" />
            </div>
            <p className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">
              <span className="font-medium text-text-primary">Bookmark</span> your favorite dark sites & modules
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
              <Percent className="h-4 w-4" />
            </div>
            <p className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">
              <span className="font-medium text-text-primary">Member Deals</span> for amazing software
            </p>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-secondary group-hover:text-text-primary transition-colors">
              <Smile className="h-4 w-4" />
            </div>
            <p className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">
              <span className="font-medium text-text-primary">Top Sites</span> via email every quarter
            </p>
          </div>
        </div>

          <div className="w-full space-y-4 sm:space-y-6">
            <div className="relative">
                    <div 
                      className="absolute -top-5 right-0 transform rotate-[-8deg] font-handwriting font-bold text-[#FF7A00] text-2xl pointer-events-none select-none hidden sm:block z-50"
                      style={{ 
                        fontFamily: 'var(--font-handwriting)',
                      }}
                    >
                      its free!
                      <svg className="absolute -bottom-4 -left-6 w-8 h-8 transform rotate-[-15deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 7L7 17M7 17H13M7 17V11" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
              <button 
                onClick={() => openAuthModal("signup")}
                className="w-full h-12 rounded-[10px] bg-[linear-gradient(180deg,#03A2FE_0%,#0190FF_100%)] border border-[#076CC4] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-[16px] font-medium text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Create Your Account
              </button>
            </div>
            <div className="text-center">
            <button 
              onClick={() => openAuthModal("signin")}
              className="text-[14px] font-medium text-text-secondary underline underline-offset-4 hover:text-text-primary transition-colors"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Paywall: React.FC = () => {
  return (
    <div 
      className="relative -mt-[800px] sm:-mt-[1400px] w-full pt-[200px] min-h-[1100px] sm:min-h-[1600px] flex flex-col justify-end [--mask-start:250px] sm:[--mask-start:500px] [--mask-end:650px] sm:[--mask-end:1000px]"
    >
      <div 
        className="absolute inset-0 z-10 bg-gradient-to-t from-page via-page/98 via-page/95 via-page/90 to-transparent backdrop-blur-[64px]" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, transparent var(--mask-start), rgba(0,0,0,0.1) calc(var(--mask-start) + 20px), rgba(0,0,0,0.4) calc(var(--mask-start) + 80px), rgba(0,0,0,0.8) calc(var(--mask-start) + 180px), black var(--mask-end), black 900px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, transparent var(--mask-start), rgba(0,0,0,0.1) calc(var(--mask-start) + 20px), rgba(0,0,0,0.4) calc(var(--mask-start) + 80px), rgba(0,0,0,0.8) calc(var(--mask-start) + 180px), black var(--mask-end), black 900px)'
        }}
      />
      <div className="container relative z-20 mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SignupCard />
        </motion.div>
      </div>
    </div>
  );
};
