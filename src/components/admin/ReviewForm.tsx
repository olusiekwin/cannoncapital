import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormProps {
  review?: any;
  onClose: () => void;
  onSave: () => void;
}

export function ReviewForm({ review, onClose, onSave }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    articleSlug: "",
    authorName: "",
    authorEmail: "",
    rating: 5,
    content: "",
    approved: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (review) {
      setFormData({
        articleSlug: review.articleSlug || "",
        authorName: review.authorName || "",
        authorEmail: review.authorEmail || "",
        rating: review.rating || 5,
        content: review.content || "",
        approved: review.approved || false,
      });
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (review) {
        await api.updateReview(review.id, formData);
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        await api.createReview(formData);
        toast({
          title: "Success",
          description: "Review created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save review",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {review ? "Edit Review" : "Add New Review"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Article Slug *</label>
            <input
              type="text"
              required
              value={formData.articleSlug}
              onChange={(e) =>
                setFormData({ ...formData, articleSlug: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="article-slug"
            />
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
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Name *</label>
            <input
              type="text"
              required
              value={formData.authorName}
              onChange={(e) =>
                setFormData({ ...formData, authorName: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Email *</label>
            <input
              type="email"
              required
              value={formData.authorEmail}
              onChange={(e) =>
                setFormData({ ...formData, authorEmail: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Review Content *</label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.approved}
            onChange={(e) =>
              setFormData({ ...formData, approved: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Approved</label>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="hero">
            {review ? "Update" : "Create"} Review
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


