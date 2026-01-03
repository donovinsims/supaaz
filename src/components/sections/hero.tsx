"use client";

import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
        <header className="w-full pt-[100px] flex flex-col bg-page transition-theme">
          <div className="container flex flex-col items-start text-left">
          <div
            className={cn(
              "group mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span className="text-[12px] font-semibold tracking-wider uppercase">✨ 100+ DIRECTORIES NOW!</span>
              <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>

          <h1 className="text-[48px] md:text-[64px] font-bold text-text-primary leading-[1.1] tracking-[-0.02em] mb-6 max-w-[720px]">
            Discover the Best Online Directories
          </h1>

          <p className="text-[18px] text-text-secondary leading-[1.6] mb-10 max-w-[620px]">
            Start your own directory with Stacker Framer template for listing and curation.
          </p>

                  <div className="w-full max-w-[474px] mb-12">
                    <form 
                      className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 group relative"
                      onSubmit={handleSubmit}
                    >
                      <div className="relative w-full">
                        {isDark && (
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[#666666]">
                            <Mail size={18} strokeWidth={1.5} />
                          </div>
                        )}
                        <input
                          type="email"
                          placeholder={isDark ? "Enter Your E-Mail" : "Enter your email"}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={status === 'loading'}
                            className="w-full bg-[#FCFCFC] dark:bg-[#151515] pl-5 dark:pl-11 pr-5 md:pr-[200px] py-5 text-[#050505] dark:text-[#F9F9F9] outline-none placeholder-[#666666] text-[14px] rounded-[14px] shadow-[inset_0_0_0_1px_#E8E8E8] dark:shadow-[inset_0_0_0_1px_#1F1F1F] transition-all"
                        />
                      </div>
                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full md:w-auto md:absolute md:right-[6px] md:top-[6px] md:bottom-[10px] bg-[linear-gradient(180deg,#03A2FE_0%,#0190FF_100%)] border border-[#076CC4] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-white px-6 py-5 md:py-0 rounded-[14px] md:rounded-[10px] font-medium text-[15px] md:text-[14px] transition-all whitespace-nowrap disabled:opacity-50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                        {status === 'loading' ? 'Sending...' : (isDark ? 'Get Monthly Picks' : 'Get Our Weekly Picks')}
                      </button>
                    </form>
              {status === 'success' && (
                <p className="text-green-500 text-sm mt-2">Thanks for subscribing!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>
              )}
            </div>
        </div>
      </header>
  );
};

export default HeroSection;
