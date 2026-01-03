import React from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-page pt-[40px] pb-[40px] border-t border-border-1 transition-theme">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-text-primary">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[28px] font-bold text-text-primary tracking-tight font-sans">Stacker</span>
            </div>
            
            <p className="text-text-secondary text-[18px] max-w-[320px] mb-4">
              A Curation and Directory Framer Template
            </p>
            
            <div className="flex items-center gap-4">
              <span className="text-text-secondary text-[14px]">Follow us on:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            <div className="flex flex-col gap-4">
              <h4 className="text-text-primary text-[16px] font-semibold">Categories:</h4>
              <ul className="flex flex-col gap-3">
                {['AI', 'Software', 'Design', 'Marketing', 'Tech', 'Travel', 'Launch Platforms', 'Music'].map((item) => (
                  <li key={item}>
                    <a href={`/categories/${item.toLowerCase().replace(' ', '-')}`} className="text-text-secondary text-[16px] hover:text-text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-text-primary text-[16px] font-semibold">More on Stacker:</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'Blog', href: '/blog' },
                  { name: 'All Categories', href: '/categories' },
                  { name: 'Submit Directory', href: '/submit' },
                  { name: 'Advertise', href: '/advertise' },
                  { name: 'Disclaimer', href: '/disclaimer' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-text-secondary text-[16px] hover:text-text-primary transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-text-primary text-[16px] font-semibold">Check out:</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'Get Framer', href: 'https://www.framer.com' },
                  { name: 'Get this template', href: '#' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-text-secondary text-[16px] hover:text-text-primary transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="pt-8 border-t border-border-1 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-[12px] text-center md:text-left">
            Website screenshots are copyright of their respective owners and are used for representational purpose only. <a href="/disclaimer" className="underline hover:text-text-primary transition-colors">Read disclaimer</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
