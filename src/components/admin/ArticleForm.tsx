import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ArticleFormProps {
  article?: any;
  onClose: () => void;
  onSave: () => void;
}

export function ArticleForm({ article, onClose, onSave }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    authorRole: "",
    readTime: "5 min read",
    heroImage: "",
    excerpt: "",
    content: [""],
    relatedTopics: [""],
    published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (article) {
      setFormData({
        slug: article.slug || "",
        title: article.title || "",
        category: article.category || "",
        date: article.date || new Date().toISOString().split("T")[0],
        author: article.author || "",
        authorRole: article.authorRole || "",
        readTime: article.readTime || "5 min read",
        heroImage: article.heroImage || "",
        excerpt: article.excerpt || "",
        content: article.content || [""],
        relatedTopics: article.relatedTopics || [""],
        published: article.published || false,
      });
    }
  }, [article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        content: formData.content.filter((c) => c.trim()),
        relatedTopics: formData.relatedTopics.filter((t) => t.trim()),
      };

      if (article) {
        await api.updateArticle(article.id, data);
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        await api.createArticle(data);
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save article",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {article ? "Edit Article" : "Add New Article"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="article-slug"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author *</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Role *</label>
            <input
              type="text"
              required
              value={formData.authorRole}
              onChange={(e) =>
                setFormData({ ...formData, authorRole: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Read Time *</label>
            <input
              type="text"
              required
              value={formData.readTime}
              onChange={(e) =>
                setFormData({ ...formData, readTime: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="5 min read"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Hero Image URL *</label>
            <input
              type="url"
              required
              value={formData.heroImage}
              onChange={(e) =>
                setFormData({ ...formData, heroImage: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Excerpt *</label>
          <textarea
            required
            rows={3}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Content (one paragraph per line) *
          </label>
          <textarea
            required
            rows={10}
            value={formData.content.join("\n\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value.split("\n\n").filter((p) => p.trim()),
              })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Related Topics (comma-separated)
          </label>
          <input
            type="text"
            value={formData.relatedTopics.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                relatedTopics: e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t),
              })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label className="text-sm font-medium">Published</label>
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="hero">
            {article ? "Update" : "Create"} Article
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

