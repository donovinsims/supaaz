"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Send, User as UserIcon, LogOut, Loader2, X, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Logo } from '@/components/ui/logo';
import { SubmitModal } from '@/components/ui/submit-modal';
import { AuthModal } from '@/components/ui/auth-modal';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] w-full bg-page/80 backdrop-blur-md transition-theme">
      <div className="container h-[56px] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
              <Link 
                href="/software" 
                className="text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all"
              >
                Software
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Guides
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Catalog
              </Link>
              <Link 
                href="/" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Learn
              </Link>
              <Link 
                href="/creators" 
                className="text-text-secondary hover:text-text-primary px-3 py-1.5 text-[12px] font-medium transition-colors rounded-[8px]"
              >
                Creators
              </Link>
            </nav>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
              <button className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>

              <div className="hidden sm:flex items-center gap-2">
                <button 
                  onClick={() => setSubmitModalOpen(true)}
                  className="flex items-center gap-1.5 text-text-primary bg-ui-1 border border-border-1 px-3 py-1.5 text-[12px] font-medium rounded-[8px] hover:bg-ui-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </button>

                {loading ? (
                  <div className="flex items-center justify-center px-3 py-1.5">
                    <Loader2 className="w-4 h-4 animate-spin text-text-secondary" />
                  </div>
                ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-[8px] hover:bg-ui-1 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-ui-3 flex items-center justify-center overflow-hidden">
                      {user.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url}
                          alt="Avatar"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon className="w-4 h-4 text-text-secondary" />
                      )}
                    </div>
                  </button>

                  {menuOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setMenuOpen(false)} 
                      />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-ui-1 border border-border-1 rounded-[12px] shadow-xl z-20 overflow-hidden">
                        <div className="p-3 border-b border-border-1">
                          <p className="text-[13px] font-medium text-text-primary truncate">
                            {user.user_metadata?.full_name || user.email?.split("@")[0]}
                          </p>
                          <p className="text-[11px] text-text-secondary truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1">
                          <Link
                            href="/profile"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2.5 text-[13px] text-text-primary hover:bg-ui-2 rounded-[8px] transition-colors min-h-[44px]"
                          >
                            <UserIcon className="w-4 h-4" />
                            Profile
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-500 hover:bg-ui-2 rounded-[8px] transition-colors min-h-[44px]"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                ) : (
                  <>
                    <button 
                      onClick={() => { setAuthMode("signin"); setAuthModalOpen(true); }}
                      className="text-text-primary px-3 py-1.5 text-[12px] font-medium hover:text-text-primary transition-colors"
                    >
                      Sign in
                    </button>
                    <button 
                      onClick={() => { setAuthMode("signup"); setAuthModalOpen(true); }}
                    className="h-10 px-4 rounded-[10px] bg-[linear-gradient(180deg,#FF6B9D_0%,#F94C8C_100%)] border border-[#E03A7A] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-white text-sm font-medium transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <>
              <div 
                className="sm:hidden fixed inset-0 top-[56px] bg-black/50 z-40" 
                onClick={() => setMobileMenuOpen(false)} 
              />
              <div className="sm:hidden fixed left-0 right-0 top-[56px] bg-page border-b border-border-1 z-50 max-h-[calc(100vh-56px)] overflow-y-auto">
                <nav className="flex flex-col p-4 gap-1">
                  <Link 
                    href="/software" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-primary px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-1 transition-colors min-h-[48px] flex items-center"
                  >
                    Software
                  </Link>
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-secondary px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-1 transition-colors min-h-[48px] flex items-center"
                  >
                    Guides
                  </Link>
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-secondary px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-1 transition-colors min-h-[48px] flex items-center"
                  >
                    Catalog
                  </Link>
                  <Link 
                    href="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-secondary px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-1 transition-colors min-h-[48px] flex items-center"
                  >
                    Learn
                  </Link>
                  <Link 
                    href="/creators" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-text-secondary px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-1 transition-colors min-h-[48px] flex items-center"
                  >
                    Creators
                  </Link>
                </nav>
                
                <div className="border-t border-border-1 p-4 flex flex-col gap-3">
                  <button 
                    onClick={() => { setSubmitModalOpen(true); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 text-text-primary bg-ui-1 border border-border-1 px-4 py-3 text-[15px] font-medium rounded-[8px] hover:bg-ui-2 transition-all min-h-[48px]"
                  >
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                  
                  {loading ? (
                    <div className="flex items-center justify-center min-h-[48px]">
                      <Loader2 className="w-5 h-5 animate-spin text-text-secondary" />
                    </div>
                  ) : user ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 px-4 py-3 bg-ui-1 rounded-[8px]">
                        <div className="w-10 h-10 rounded-full bg-ui-3 flex items-center justify-center overflow-hidden shrink-0">
                          {user.user_metadata?.avatar_url ? (
                            <Image
                              src={user.user_metadata.avatar_url}
                              alt="Avatar"
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon className="w-5 h-5 text-text-secondary" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-text-primary truncate">
                            {user.user_metadata?.full_name || user.email?.split("@")[0]}
                          </p>
                          <p className="text-[12px] text-text-secondary truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium text-text-primary bg-ui-1 rounded-[8px] hover:bg-ui-2 transition-colors min-h-[48px]"
                      >
                        <UserIcon className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-[15px] font-medium text-red-500 bg-ui-1 rounded-[8px] hover:bg-ui-2 transition-colors min-h-[48px]"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => { setAuthMode("signin"); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                        className="text-text-primary px-4 py-3 text-[15px] font-medium rounded-[8px] bg-ui-1 hover:bg-ui-2 transition-colors min-h-[48px]"
                      >
                        Sign in
                      </button>
                        <button 
                          onClick={() => { setAuthMode("signup"); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                          className="h-12 px-4 rounded-[10px] bg-[linear-gradient(180deg,#FF6B9D_0%,#F94C8C_100%)] border border-[#E03A7A] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-white text-[15px] font-medium transition-all hover:brightness-110 disabled:opacity-50"
                        >
                          Create Account
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
      </div>
      <SubmitModal open={submitModalOpen} onOpenChange={setSubmitModalOpen} />
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultMode={authMode} />
    </div>
  );
};

export default Navbar;
