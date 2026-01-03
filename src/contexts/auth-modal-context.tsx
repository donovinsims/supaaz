"use client";

import React, { createContext, useContext, useState } from "react";
import { AuthModal } from "@/components/ui/auth-modal";

interface AuthModalContextType {
  openAuthModal: (mode?: "signin" | "signup") => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signup");

  const openAuthModal = (newMode: "signin" | "signup" = "signup") => {
    setMode(newMode);
    setOpen(true);
  };

  const closeAuthModal = () => {
    setOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal open={open} onOpenChange={setOpen} defaultMode={mode} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
}
