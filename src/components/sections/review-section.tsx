"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Send, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Review, User as UserType } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ReviewSectionProps {
  submissionId: string;
}

interface ReviewWithUser extends Review {
  users: UserType;
}

export function ReviewSection({ submissionId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchReviews();
    checkUser();
  }, [submissionId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}/reviews`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/submissions/${submissionId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (response.ok) {
        toast.success("Review submitted successfully");
        setRating(0);
        setComment("");
        fetchReviews();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
    : 0;

  return (
    <div className="mt-16 border-t border-border-1 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[24px] font-bold text-text-primary flex items-center gap-2">
            Reviews <span className="text-text-secondary font-normal text-[18px]">({reviews.length})</span>
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={16}
                    className={s <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-border-2"}
                  />
                ))}
              </div>
              <span className="text-[14px] font-medium text-text-primary">{averageRating.toFixed(1)} average</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="bg-ui-1 border border-border-1 rounded-2xl p-6 sticky top-24">
            <h3 className="text-[18px] font-bold text-text-primary mb-4">Write a review</h3>
            {!currentUser ? (
              <div className="text-center py-6">
                <p className="text-text-secondary text-[14px] mb-4">You must be signed in to leave a review.</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="/auth/signin">Sign In</a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[14px] font-medium text-text-secondary mb-2">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-colors"
                      >
                        <Star
                          size={24}
                          className={`${
                            s <= (hoverRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-border-2"
                          } transition-all duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-text-secondary mb-2">Comment</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this website..."
                    className="min-h-[120px] bg-page border-border-1 focus:ring-1 ring-ui-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full bg-ui-1 hover:bg-ui-2 text-text-primary border border-border-1"
                >
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Submit Review
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-ui-1" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-ui-1 border border-border-1 border-dashed rounded-2xl p-12 text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-text-secondary/20 mb-4" />
              <h4 className="text-[16px] font-medium text-text-primary mb-1">No reviews yet</h4>
              <p className="text-[14px] text-text-secondary">Be the first to share your thoughts!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-ui-1 border border-border-1 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border-1">
                      <AvatarImage src={review.users?.avatar_url || ""} />
                      <AvatarFallback className="bg-page text-text-secondary">
                        <User size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-[14px] font-bold text-text-primary">
                        {review.users?.full_name || "Anonymous User"}
                      </div>
                      <div className="text-[12px] text-text-secondary">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-border-2"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[15px] text-text-primary leading-relaxed whitespace-pre-wrap">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
