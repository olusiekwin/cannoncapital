import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CareerFormProps {
  career?: any;
  onClose: () => void;
  onSave: () => void;
}

export function CareerForm({ career, onClose, onSave }: CareerFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    description: "",
    requirements: "",
    responsibilities: "",
    orderIndex: 0,
    published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (career) {
      setFormData({
        title: career.title || "",
        department: career.department || "",
        location: career.location || "",
        type: career.type || "",
        description: career.description || "",
        requirements: career.requirements || "",
        responsibilities: career.responsibilities || "",
        orderIndex: career.orderIndex || 0,
        published: career.published || false,
      });
    }
  }, [career]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (career) {
        await api.updateCareer(career.id, formData);
        toast({
          title: "Success",
          description: "Career updated successfully",
        });
      } else {
        await api.createCareer(formData);
        toast({
          title: "Success",
          description: "Career created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save career",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {career ? "Edit Career" : "Add New Career"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-2">Department *</label>
            <input
              type="text"
              required
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Type *</label>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select type...</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Requirements</label>
          <textarea
            rows={4}
            value={formData.requirements}
            onChange={(e) =>
              setFormData({ ...formData, requirements: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="List key requirements..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Responsibilities</label>
          <textarea
            rows={4}
            value={formData.responsibilities}
            onChange={(e) =>
              setFormData({ ...formData, responsibilities: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="List key responsibilities..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Order Index</label>
            <input
              type="number"
              value={formData.orderIndex}
              onChange={(e) =>
                setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4"
              />
              <span className="text-sm">Published</span>
            </label>
          </div>
        </div>
        <div className="flex gap-4">
          <Button type="submit" variant="hero">
            {career ? "Update Career" : "Create Career"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}



