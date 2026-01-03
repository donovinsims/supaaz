"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface WebsitePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
  website: {
    title: string;
    url: string;
    image: string;
    favicon?: string;
  };
}

export function WebsitePreviewModal({
  isOpen,
  onClose,
  layoutId,
  website,
}: WebsitePreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleExternalLink = () => {
    window.parent.postMessage(
      { type: "OPEN_EXTERNAL_URL", data: { url: website.url } },
      "*"
    );
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="w-full max-w-4xl h-[85vh] max-h-[900px] bg-[#1a1a1a] rounded-[16px] overflow-hidden flex flex-col shadow-2xl pointer-events-auto border border-white/10"
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors"
                    />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <span className="text-[14px] font-medium text-white/70 ml-2">
                    Preview
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="text-white/40 hover:text-white/80 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleExternalLink}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClose}
                    className="text-white/40 hover:text-white/80 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden bg-white relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                      <span className="text-white/50 text-sm">Loading preview...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={website.url}
                  className="w-full h-full border-0"
                  title={`Preview of ${website.title}`}
                  onLoad={() => setIsLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
