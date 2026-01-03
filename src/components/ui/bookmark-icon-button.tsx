"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const animations = {
  icon: {
    initial: { scale: 1, rotate: 0 },
    tapActive: { scale: 0.85, rotate: -10 },
    tapCompleted: { scale: 1, rotate: 0 },
  },
  burst: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: [0, 1.4, 1], opacity: [0, 0.4, 0] },
    transition: { duration: 0.7, ease: "easeOut" },
  },
  particles: (index: number) => {
    const angle = (index / 5) * (2 * Math.PI);
    const radius = 18 + Math.random() * 8;
    const scale = 0.8 + Math.random() * 0.4;
    const duration = 0.6 + Math.random() * 0.1;

    return {
      initial: { scale: 0, opacity: 0.3, x: 0, y: 0 },
      animate: {
        scale: [0, scale, 0],
        opacity: [0.3, 0.8, 0],
        x: [0, Math.cos(angle) * radius],
        y: [0, Math.sin(angle) * radius * 0.75],
      },
      transition: { duration, delay: index * 0.04, ease: "easeOut" },
    };
  },
};

interface BookmarkIconButtonProps {
  websiteSlug: string;
}

export function BookmarkIconButton({ websiteSlug }: BookmarkIconButtonProps) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [toggling, setToggling] = React.useState(false);
  const [userId, setUserId] = React.useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  React.useEffect(() => {
    const checkBookmark = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      setUserId(user.id);

      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("website_slug", websiteSlug)
        .single();

      setIsSaved(!!data);
      setLoading(false);
    };

    checkBookmark();
  }, [websiteSlug, supabase]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      router.push("/auth/signin");
      return;
    }

    setToggling(true);

    if (isSaved) {
      await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", userId)
        .eq("website_slug", websiteSlug);
      setIsSaved(false);
    } else {
      await supabase
        .from("bookmarks")
        .insert({
          user_id: userId,
          website_slug: websiteSlug,
        });
      setIsSaved(true);
    }

    setToggling(false);
  };

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="w-4 h-4 animate-spin opacity-40" />
      </Button>
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        disabled={toggling}
        aria-pressed={isSaved}
      >
        {toggling ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: isSaved ? 1.1 : 1 }}
            whileTap={
              isSaved ? animations.icon.tapCompleted : animations.icon.tapActive
            }
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative flex items-center justify-center"
          >
            <Bookmark className="opacity-60" size={16} aria-hidden="true" />

            <Bookmark
              className="absolute inset-0 text-blue-500 fill-blue-500 transition-all duration-300"
              size={16}
              aria-hidden="true"
              style={{ opacity: isSaved ? 1 : 0 }}
            />

            <AnimatePresence>
              {isSaved && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 80%)",
                  }}
                  {...animations.burst}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </Button>

      <AnimatePresence>
        {isSaved && !toggling && (
          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-500"
                style={{
                  width: `${4 + Math.random() * 2}px`,
                  height: `${4 + Math.random() * 2}px`,
                  filter: "blur(1px)",
                  transform: "translate(-50%, -50%)",
                }}
                initial={animations.particles(i).initial}
                animate={animations.particles(i).animate}
                transition={animations.particles(i).transition}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
