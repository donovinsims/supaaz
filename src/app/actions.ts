"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  full_name: z.string().max(100).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  website: z.string().url().optional().or(z.literal("")).nullable(),
  social_links: z.object({
    twitter: z.string().optional().nullable(),
    github: z.string().optional().nullable(),
    linkedin: z.string().optional().nullable(),
  }).optional().nullable(),
  is_public: z.boolean(),
  show_bookmarks_publicly: z.boolean(),
  avatar_url: z.string().optional().nullable(),
});

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Unauthorized");
  
  const validated = profileSchema.parse(data);
  
  const { error } = await supabase
    .from("users")
    .update({
      full_name: validated.full_name,
      bio: validated.bio,
      website: validated.website,
      social_links: validated.social_links,
      is_public: validated.is_public,
      show_bookmarks_publicly: validated.show_bookmarks_publicly,
      avatar_url: validated.avatar_url,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);
    
  if (error) throw new Error(error.message);
  
  revalidatePath("/dashboard/settings");
  return { success: true };
}
