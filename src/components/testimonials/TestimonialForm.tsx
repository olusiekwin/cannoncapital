import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Star, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    image: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await api.createTestimonial(formData);
      
      if (response.success) {
        // Reset form
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          image: '',
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        toast({
          title: "Success",
          description: "Thank you for your testimonial! It will be published after admin approval.",
        });
      } else {
        throw new Error(response.error || "Failed to submit");
      }
    } catch (error: any) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Error",
        description: error.message || "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 text-center">
        <p className="text-green-800 font-medium">
          Thank you for your testimonial! It will be published after admin approval.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-heading text-2xl text-foreground mb-4">Share Your Experience</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Help others learn about working with Canon Capital Partners LLC
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Your Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Your Role/Title *</label>
          <input
            type="text"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Company (Optional)</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Your Photo URL (Optional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://..."
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
        <label className="block text-sm font-medium mb-2">Your Testimonial *</label>
        <textarea
          required
          rows={5}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience working with Canon Capital Partners LLC..."
        />
      </div>

      <Button type="submit" variant="hero" disabled={submitting} className="w-full md:w-auto">
        <Send className="w-4 h-4 mr-2" />
        {submitting ? 'Submitting...' : 'Submit Testimonial'}
      </Button>
    </form>
  );
}
