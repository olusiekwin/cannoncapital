import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  comment?: any;
  onClose: () => void;
  onSave: () => void;
}

export function CommentForm({ comment, onClose, onSave }: CommentFormProps) {
  const [formData, setFormData] = useState({
    articleSlug: "",
    authorName: "",
    authorEmail: "",
    content: "",
    approved: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (comment) {
      setFormData({
        articleSlug: comment.articleSlug || "",
        authorName: comment.authorName || "",
        authorEmail: comment.authorEmail || "",
        content: comment.content || "",
        approved: comment.approved || false,
      });
    }
  }, [comment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (comment) {
        await api.updateComment(comment.id, formData);
        toast({
          title: "Success",
          description: "Comment updated successfully",
        });
      } else {
        await api.createComment(formData);
        toast({
          title: "Success",
          description: "Comment created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save comment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {comment ? "Edit Comment" : "Add New Comment"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            required
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.approved}
              onChange={(e) =>
                setFormData({ ...formData, approved: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span className="text-sm">Approved</span>
          </label>
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="hero">
            {comment ? "Update Comment" : "Create Comment"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}



