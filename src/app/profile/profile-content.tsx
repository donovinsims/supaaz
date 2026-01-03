"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import { websites } from "@/lib/data";
import { Bookmark, Settings, LogOut, Loader2, User as UserIcon, X } from "lucide-react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
}

interface BookmarkItem {
  id: string;
  user_id: string;
  website_slug: string;
  created_at: string;
}

interface ProfileContentProps {
  user: User;
  profile: Profile | null;
  bookmarks: BookmarkItem[];
}

export function ProfileContent({ user, profile, bookmarks }: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const bookmarkedWebsites = bookmarks
    .map((b) => websites.find((w) => w.slug === b.website_slug))
    .filter(Boolean);

  const handleSaveProfile = async () => {
    setSaving(true);
    await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio,
        website,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);
    
    setSaving(false);
    setIsEditing(false);
    router.refresh();
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleRemoveBookmark = async (slug: string) => {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("website_slug", slug);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="pt-[80px] pb-16">
        <div className="container max-w-4xl">
          <div className="bg-ui-1 border border-border-1 rounded-[20px] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-ui-3 flex items-center justify-center overflow-hidden flex-shrink-0">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || "User"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 text-text-secondary" />
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1.5">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-ui-2 border border-border-1 rounded-[10px] text-text-primary text-[14px] focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1.5">
                        Bio
                      </label>
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-ui-2 border border-border-1 rounded-[10px] text-text-primary text-[14px] focus:outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1.5">
                        Website
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full px-4 py-2.5 bg-ui-2 border border-border-1 rounded-[10px] text-text-primary text-[14px] focus:outline-none focus:border-primary"
                        placeholder="https://"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium text-[13px] rounded-[8px] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Save changes
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-ui-2 hover:bg-ui-3 text-text-primary font-medium text-[13px] rounded-[8px] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-[24px] font-semibold text-text-primary mb-1">
                      {profile?.full_name || user.email?.split("@")[0]}
                    </h1>
                    <p className="text-text-secondary text-[14px] mb-3">{user.email}</p>
                    {profile?.bio && (
                      <p className="text-text-secondary text-[14px] mb-3">{profile.bio}</p>
                    )}
                    {profile?.website && (
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-[14px] hover:underline"
                      >
                        {profile.website}
                      </a>
                    )}
                  </>
                )}
              </div>

              {!isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2.5 bg-ui-2 hover:bg-ui-3 border border-border-1 rounded-[10px] text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="p-2.5 bg-ui-2 hover:bg-ui-3 border border-border-1 rounded-[10px] text-text-secondary hover:text-red-500 transition-colors disabled:opacity-50"
                  >
                    {loggingOut ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <LogOut className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Bookmark className="w-5 h-5 text-primary" />
              <h2 className="text-[20px] font-semibold text-text-primary">
                My Bookmarks
              </h2>
              <span className="text-text-secondary text-[14px]">
                ({bookmarkedWebsites.length})
              </span>
            </div>

            {bookmarkedWebsites.length === 0 ? (
              <div className="bg-ui-1 border border-border-1 rounded-[16px] p-12 text-center">
                <Bookmark className="w-12 h-12 text-text-secondary/30 mx-auto mb-4" />
                <h3 className="text-[18px] font-medium text-text-primary mb-2">
                  No bookmarks yet
                </h3>
                <p className="text-text-secondary text-[14px] mb-6">
                  Start exploring and bookmark websites you love
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium text-[14px] rounded-[10px] transition-colors"
                >
                  Explore Directory
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bookmarkedWebsites.map((website) => (
                  <div
                    key={website!.id}
                    className="group bg-ui-1 border border-border-1 rounded-[16px] overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <Link href={`/website/${website!.slug}`}>
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <Image
                          src={website!.image}
                          alt={website!.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/website/${website!.slug}`}>
                          <h3 className="font-semibold text-text-primary text-[15px] hover:text-primary transition-colors">
                            {website!.title}
                          </h3>
                          <p className="text-text-secondary text-[13px] line-clamp-1 mt-0.5">
                            {website!.tagline}
                          </p>
                        </Link>
                        <button
                          onClick={() => handleRemoveBookmark(website!.slug)}
                          className="p-1.5 hover:bg-ui-3 rounded-[6px] text-text-secondary hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
