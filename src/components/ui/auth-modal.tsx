"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "signin" | "signup";
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
            className="fixed top-[50%] left-[50%] z-[201] w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] bg-ui-1 border border-border-1 rounded-[24px] p-8 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
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
                        className="w-full h-12 bg-[linear-gradient(180deg,#FF6B9D_0%,#F94C8C_100%)] border border-[#E03A7A] shadow-[inset_0_1.5px_0_1px_rgba(255,255,255,0.24)] text-white rounded-[10px] font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
