import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface TestimonialFormProps {
  testimonial?: any;
  onClose: () => void;
  onSave: () => void;
}

export function TestimonialForm({ testimonial, onClose, onSave }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    approved: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || "",
        role: testimonial.role || "",
        company: testimonial.company || "",
        content: testimonial.content || "",
        rating: testimonial.rating || 5,
        image: testimonial.image || "",
        approved: testimonial.approved || false,
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (testimonial) {
        await api.updateTestimonial(testimonial.id, formData);
        toast({
          title: "Success",
          description: "Testimonial updated successfully",
        });
      } else {
        await api.createTestimonial(formData);
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {testimonial ? "Edit Testimonial" : "Add New Testimonial"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role *</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Content *</label>
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
            {testimonial ? "Update" : "Create"} Testimonial
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


