import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { Star, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ArticleReviewsProps {
  articleSlug: string;
  inline?: boolean;
}

export function ArticleReviews({ articleSlug, inline = false }: ArticleReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());
  const INITIAL_REVIEWS_COUNT = inline ? 3 : 5;
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    rating: 5,
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const loadReviews = useCallback(async () => {
    if (!articleSlug) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.getArticleReviews(articleSlug);
      if (response?.success && response?.data) {
        const reviewsData = Array.isArray(response.data) ? response.data : [];
        setReviews(reviewsData);
        
        // Load liked reviews from localStorage
        const liked = JSON.parse(localStorage.getItem('liked_reviews') || '[]');
        setLikedReviews(new Set(liked));
      } else {
        setReviews([]);
      }
    } catch (error: any) {
      // Log error but don't break the page - reviews are optional
      if (import.meta.env.DEV) {
        console.error('Error loading reviews (non-blocking):', error);
      }
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [articleSlug]);

  const handleLikeReview = async (reviewId: string) => {
    try {
      // Generate a simple user identifier
      let userId = localStorage.getItem('user_id');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('user_id', userId);
      }

      const response: any = await api.likeReview(reviewId, userId);
      if (response?.success) {
        // Update the review's likes count - response has likes at top level
        const newLikes = response.likes ?? response.data?.likes ?? 0;
        const isLiked = response.liked ?? response.data?.liked ?? false;
        
        setReviews(prevReviews =>
          prevReviews.map(review =>
            review.id === reviewId
              ? { ...review, likes: newLikes }
              : review
          )
        );

        // Update liked state
        const newLiked = new Set(likedReviews);
        if (isLiked) {
          newLiked.add(reviewId);
        } else {
          newLiked.delete(reviewId);
        }
        setLikedReviews(newLiked);
        localStorage.setItem('liked_reviews', JSON.stringify(Array.from(newLiked)));
      }
    } catch (error: any) {
      console.error('Error liking review:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to like review",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (articleSlug) {
      loadReviews();
    } else {
      setLoading(false);
    }
  }, [articleSlug, loadReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await api.createReview({
        articleSlug,
        ...formData,
      });
      
      if (response.success) {
        // Reset form
        setFormData({
          authorName: '',
          authorEmail: '',
          rating: 5,
          content: '',
        });
        setShowForm(false);
        toast({
          title: "Success",
          description: "Thank you for your review! It will be published after admin approval.",
        });
        loadReviews(); // Reload to show new review if approved
      } else {
        throw new Error(response.error || "Failed to submit");
      }
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, INITIAL_REVIEWS_COUNT);
  const hasMore = reviews.length > INITIAL_REVIEWS_COUNT;

  const content = (
    <div className={inline ? "" : "max-w-4xl mx-auto"}>
      <div className="flex items-center justify-between mb-4">
            <div>
          {!inline && (
            <>
              <div className="flex items-center gap-4 mb-2">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
                  Reviews
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                What Readers Are Saying ({reviews.length})
              </h2>
            </>
          )}
          {inline && (
            <h3 className="font-heading text-lg text-foreground">
              Reviews ({reviews.length})
            </h3>
          )}
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              variant="outline"
          size={inline ? "sm" : "default"}
            >
          {showForm ? 'Cancel' : 'Write Review'}
            </Button>
          </div>

        {/* Review Form */}
        {showForm && (
          <div className={`bg-muted/30 border border-border ${inline ? 'p-4 mb-6' : 'p-8 mb-12'}`}>
            <h3 className={`font-heading ${inline ? 'text-lg mb-4' : 'text-xl mb-6'}`}>Write a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.authorEmail}
                    onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating *</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= formData.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        } transition-colors duration-200`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Review *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Share your thoughts about this article..."
                />
              </div>
              <Button type="submit" variant="hero" disabled={submitting}>
                <Send className="w-4 h-4 mr-2" />
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className={`text-center ${inline ? 'py-8' : 'py-16'} text-muted-foreground`}>
            <p>Loading reviews...</p>
          </div>
        ) : (
          <div className={inline ? "space-y-4" : "space-y-8"}>
            {reviews.length === 0 ? (
              <div className={inline 
                ? "text-center py-8 border border-border bg-muted/20 p-6 text-muted-foreground"
                : "text-center py-16 border border-border bg-muted/20 p-12 text-muted-foreground"
              }>
                <p className={inline ? "text-base mb-1" : "text-lg mb-2"}>No reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts on this article!</p>
              </div>
            ) : (
              <>
                {displayedReviews.map((review) => (
                  <div key={review.id} className={`border-b border-border ${inline ? 'pb-4' : 'pb-8'} last:border-b-0 last:pb-0`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className={`font-heading ${inline ? 'text-base' : 'text-lg'} text-foreground mb-0.5`}>{review.authorName}</h4>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => {
                            const rating = typeof review.rating === 'number' ? review.rating : parseInt(review.rating) || 0;
                            return (
                              <Star
                                key={i}
                                className={`${inline ? 'w-3 h-3' : 'w-5 h-5'} ${
                                  i < rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            );
                          })}
                        </div>
                        <button
                          onClick={() => handleLikeReview(review.id)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            likedReviews.has(review.id)
                              ? 'text-red-500'
                              : 'text-muted-foreground hover:text-red-500'
                          }`}
                          aria-label={`${likedReviews.has(review.id) ? 'Unlike' : 'Like'} this review`}
                        >
                          <Heart
                            className={`${inline ? 'w-3 h-3' : 'w-4 h-4'} ${
                              likedReviews.has(review.id) ? 'fill-current' : ''
                            }`}
                          />
                          <span className="text-xs">{review.likes || 0}</span>
                        </button>
                      </div>
                    </div>
                    <p className={`text-muted-foreground ${inline ? 'leading-relaxed text-sm' : 'leading-relaxed text-base'}`}>{review.content}</p>
                  </div>
                ))}
                {hasMore && (
                  <div className="pt-4">
                    <Button
                      onClick={() => setShowAll(!showAll)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {showAll ? `Show Less` : `Show All ${reviews.length} Reviews`}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );

  if (inline) {
    return content;
  }

  return (
    <section className="section-padding border-t border-border bg-white">
      <div className="container-corporate">
        {content}
      </div>
    </section>
  );
}
