export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  username?: string;
  is_public: boolean;
  show_bookmarks_publicly: boolean;
  updated_at?: string;
  created_at?: string;
}

export interface Submission {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  url: string;
  category: string;
  framework?: string;
  cms?: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  submission_id: string;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  submission_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  user?: User;
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Partial<User> & { id: string; email: string };
        Update: Partial<User>;
      };
      submissions: {
        Row: Submission;
        Insert: Omit<Submission, 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Submission>;
      };
      bookmarks: {
        Row: Bookmark;
        Insert: Omit<Bookmark, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Bookmark>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'user'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Review>;
      };
    };
  };
};
