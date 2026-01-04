"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { User as AuthUser } from "@supabase/supabase-js";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import type { User, Submission, Bookmark } from "@/db/schema";
import { 
  Bookmark as BookmarkIcon, 
  Settings, 
  LogOut, 
  Loader2, 
  User as UserIcon, 
  X, 
  Camera, 
  Globe, 
  Eye, 
  EyeOff,
  ExternalLink
} from "lucide-react";

interface BookmarkWithSubmission extends Bookmark {
  submission?: Submission;
}

interface ProfileContentProps {
  user: AuthUser;
  profile: User | null;
  bookmarks: BookmarkWithSubmission[];
}

export function ProfileContent({ user, profile, bookmarks }: ProfileContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [isPublic, setIsPublic] = useState(profile?.is_public ?? true);
  const [showBookmarksPublicly, setShowBookmarksPublicly] = useState(profile?.show_bookmarks_publicly ?? false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  const bookmarkedSubmissions = bookmarks
    .filter((b) => b.submission)
    .map((b) => b.submission!);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const urlWithTimestamp = `${publicUrl}?t=${Date.now()}`;
    setAvatarUrl(urlWithTimestamp);

    await supabase
      .from("users")
      .update({ avatar_url: urlWithTimestamp })
      .eq("id", user.id);

    setUploading(false);
    router.refresh();
  };

  const validateUsername = (value: string): boolean => {
    if (!value) {
      setUsernameError("Username is required");
      return false;
    }
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameError("Only letters, numbers, and underscores allowed");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateUsername(username)) return;

    setSaving(true);

    const { error } = await supabase
      .from("users")
      .update({
        full_name: fullName,
        username: username.toLowerCase(),
        bio,
        website,
        is_public: isPublic,
        show_bookmarks_publicly: showBookmarksPublicly,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error?.code === "23505") {
      setUsernameError("This username is already taken");
      setSaving(false);
      return;
    }

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

  const handleRemoveBookmark = async (submissionId: string) => {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("submission_id", submissionId);
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-page transition-theme">
      <Navbar />
      <main className="pt-[80px] pb-16">
        <div className="container max-w-4xl">
          <div className="bg-ui-1 border border-border-1 rounded-[20px] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-ui-3 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-border-1">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={fullName || "User"}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-text-secondary" />
                  )}
                </div>
                {isEditing && (
                  <>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          Username
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-[14px]">@</span>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                              setUsername(e.target.value);
                              validateUsername(e.target.value);
                            }}
                            className={`w-full pl-8 pr-4 py-2.5 bg-ui-2 border rounded-[10px] text-text-primary text-[14px] focus:outline-none ${
                              usernameError ? "border-red-500" : "border-border-1 focus:border-primary"
                            }`}
                            placeholder="username"
                          />
                        </div>
                        {usernameError && (
                          <p className="text-[12px] text-red-500 mt-1">{usernameError}</p>
                        )}
                      </div>
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

                    <div className="pt-4 border-t border-border-1">
                      <h3 className="text-[14px] font-semibold text-text-primary mb-3">Privacy Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-ui-2 rounded-[10px] cursor-pointer hover:bg-ui-3 transition-colors">
                          <div className="flex items-center gap-3">
                            {isPublic ? <Eye className="w-4 h-4 text-text-secondary" /> : <EyeOff className="w-4 h-4 text-text-secondary" />}
                            <div>
                              <p className="text-[14px] font-medium text-text-primary">Public Profile</p>
                              <p className="text-[12px] text-text-secondary">Allow others to view your profile at /u/{username || "username"}</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                            className="w-5 h-5 rounded accent-primary"
                          />
                        </label>

                        <label className={`flex items-center justify-between p-3 bg-ui-2 rounded-[10px] cursor-pointer transition-colors ${isPublic ? "hover:bg-ui-3" : "opacity-50 cursor-not-allowed"}`}>
                          <div className="flex items-center gap-3">
                            <BookmarkIcon className="w-4 h-4 text-text-secondary" />
                            <div>
                              <p className="text-[14px] font-medium text-text-primary">Show Bookmarks Publicly</p>
                              <p className="text-[12px] text-text-secondary">Display your bookmarked websites on your public profile</p>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={showBookmarksPublicly}
                            onChange={(e) => setShowBookmarksPublicly(e.target.checked)}
                            disabled={!isPublic}
                            className="w-5 h-5 rounded accent-primary"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="px-4 py-2 bg-primary hover:bg-primary-hover text-white font-medium text-[13px] rounded-[8px] transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                        Save changes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setFullName(profile?.full_name || "");
                          setUsername(profile?.username || "");
                          setBio(profile?.bio || "");
                          setWebsite(profile?.website || "");
                          setIsPublic(profile?.is_public ?? true);
                          setShowBookmarksPublicly(profile?.show_bookmarks_publicly ?? false);
                          setUsernameError("");
                        }}
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
                    {profile?.username && (
                      <p className="text-text-secondary text-[14px] mb-1">@{profile.username}</p>
                    )}
                    <p className="text-text-secondary text-[14px] mb-3">{user.email}</p>
                    {profile?.bio && (
                      <p className="text-text-secondary text-[14px] mb-3">{profile.bio}</p>
                    )}
                    <div className="flex items-center gap-4 flex-wrap">
                      {profile?.website && (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-[14px] hover:underline inline-flex items-center gap-1"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          {profile.website.replace(/^https?:\/\//, "")}
                        </a>
                      )}
                      {profile?.username && profile?.is_public && (
                        <Link
                          href={`/u/${profile.username}`}
                          className="text-text-secondary hover:text-primary text-[14px] transition-colors inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          View public profile
                        </Link>
                      )}
                    </div>
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
              <BookmarkIcon className="w-5 h-5 text-primary" />
              <h2 className="text-[20px] font-semibold text-text-primary">
                My Bookmarks
              </h2>
              <span className="text-text-secondary text-[14px]">
                ({bookmarkedSubmissions.length})
              </span>
            </div>

            {bookmarkedSubmissions.length === 0 ? (
              <div className="bg-ui-1 border border-border-1 rounded-[16px] p-12 text-center">
                <BookmarkIcon className="w-12 h-12 text-text-secondary/30 mx-auto mb-4" />
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
                {bookmarkedSubmissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="group bg-ui-1 border border-border-1 rounded-[16px] overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <Link href={`/website/${submission.slug}`}>
                      <div className="aspect-[16/10] relative overflow-hidden">
                        {submission.images?.[0] ? (
                          <Image
                            src={submission.images[0]}
                            alt={submission.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-ui-2" />
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/website/${submission.slug}`}>
                          <h3 className="font-semibold text-text-primary text-[15px] hover:text-primary transition-colors">
                            {submission.title}
                          </h3>
                          <p className="text-text-secondary text-[13px] line-clamp-1 mt-0.5">
                            {submission.tagline}
                          </p>
                        </Link>
                        <button
                          onClick={() => handleRemoveBookmark(submission.id)}
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
