export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  username?: string;
  is_public: boolean;
  updated_at?: string;
}

export interface Submission {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  framework?: string;
  cms?: string;
  image_url: string;
  website_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  website_slug: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Submission>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Bookmark>;
      };
    };
  };
};
