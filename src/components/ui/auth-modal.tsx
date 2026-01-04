"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "signin" | "signup";
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function AuthModal({ open, onOpenChange, defaultMode = "signin" }: AuthModalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [mode, setMode] = React.useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  React.useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setFullName("");
      setError("");
      setSuccess(false);
    }
  }, [open]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    onOpenChange(false);
    router.refresh();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setError("");
    setSuccess(false);
  };

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    const modalContent = (

    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

            <motion.div
              className={cn(
                "fixed z-[201] bg-ui-1 shadow-2xl",
                isMobile 
                  ? "bottom-0 left-0 w-full rounded-t-[24px] border-t border-x border-border-1 p-6" 
                  : "top-[50%] left-[50%] w-full max-w-[500px] rounded-[24px] border border-border-1 p-8"
              )}
              initial={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
              animate={isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >

            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-ui-2"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-[24px] font-bold text-text-primary mb-2">
                  Check your email
                </h2>
                <p className="text-text-secondary text-[14px] mb-6">
                  We sent a confirmation link to <span className="font-medium text-text-primary">{email}</span>
                </p>
                <button
                  onClick={() => onOpenChange(false)}
                  className="w-full h-10 bg-[linear-gradient(180deg,#03A2FE_0%,#0190FF_100%)] border border-[#076CC4] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-white rounded-[10px] font-medium text-sm hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Got it
                </button>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-[28px] font-bold text-text-primary mb-2">
                    {mode === "signin" ? "Welcome back" : "Create account"}
                  </h2>
                  <p className="text-text-secondary text-[14px]">
                    {mode === "signin"
                      ? "Sign in to access your bookmarks and submissions"
                      : "Join us to save your favorites and submit websites"}
                  </p>
                </div>

                <form onSubmit={mode === "signin" ? handleSignIn : handleSignUp} className="space-y-4">
                  {mode === "signup" && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Full name"
                        className="w-full bg-ui-2 border border-border-1 text-text-primary placeholder:text-text-secondary px-5 py-4 pl-12 rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full bg-ui-2 border border-border-1 text-text-primary placeholder:text-text-secondary px-5 py-4 pl-12 rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-ui-2 border border-border-1 text-text-primary placeholder:text-text-secondary px-5 py-4 pl-12 pr-12 rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-[12px]"
                    >
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <p className="text-red-500 text-[13px]">{error}</p>
                    </motion.div>
                  )}

                          <button
                            type="submit"
                            disabled={loading}
                            className={cn(
                              "w-full h-12 text-white rounded-[10px] font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)]",
                              mode === "signin" 
                                ? "bg-[linear-gradient(180deg,#03A2FE_0%,#0190FF_100%)] border border-[#076CC4]" 
                                : "bg-[linear-gradient(180deg,#FF6B9D_0%,#F94C8C_100%)] border border-[#E03A7A]"
                            )}
                          >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {mode === "signin" ? "Signing in..." : "Creating account..."}
                        </>
                      ) : (
                        mode === "signin" ? "Sign in" : "Create account"
                      )}
                    </button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border-1" />
                  </div>
                  <div className="relative flex justify-center text-[13px] uppercase">
                    <span className="bg-ui-1 px-3 text-text-secondary">or</span>
                  </div>
                </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 bg-ui-2 border border-border-1 text-text-primary rounded-[12px] text-[14px] font-medium hover:bg-ui-3 transition-all"
                    >
                      <GoogleIcon className="w-5 h-5" />
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 h-12 bg-ui-2 border border-border-1 text-text-primary rounded-[12px] text-[14px] font-medium hover:bg-ui-3 transition-all"
                    >
                      <XIcon className="w-5 h-5" />
                      X
                    </button>
                  </div>

                <div className="mt-6 text-center">
                  <p className="text-text-secondary text-[13px]">
                    {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      onClick={switchMode}
                      className="text-text-primary font-medium hover:underline"
                    >
                      {mode === "signin" ? "Create one" : "Sign in"}
                    </button>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
