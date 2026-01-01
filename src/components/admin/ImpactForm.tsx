import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ImpactFormProps {
  impactStory?: any;
  onClose: () => void;
  onSave: () => void;
}

export function ImpactForm({ impactStory, onClose, onSave }: ImpactFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    impact: "",
    description: "",
    image: "",
    metrics: [{ label: "", value: "" }],
    orderIndex: 0,
    published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (impactStory) {
      setFormData({
        title: impactStory.title || "",
        category: impactStory.category || "",
        location: impactStory.location || "",
        impact: impactStory.impact || "",
        description: impactStory.description || "",
        image: impactStory.image || "",
        metrics: impactStory.metrics || [{ label: "", value: "" }],
        orderIndex: impactStory.orderIndex || 0,
        published: impactStory.published || false,
      });
    }
  }, [impactStory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        metrics: formData.metrics.filter((m) => m.label.trim() || m.value.trim()),
      };

      if (impactStory) {
        await api.updateImpactStory(impactStory.id, data);
        toast({
          title: "Success",
          description: "Impact story updated successfully",
        });
      } else {
        await api.createImpactStory(data);
        toast({
          title: "Success",
          description: "Impact story created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save impact story",
        variant: "destructive",
      });
    }
  };

  const addMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { label: "", value: "" }],
    });
  };

  const removeMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {impactStory ? "Edit Impact Story" : "Add New Impact Story"}
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
            <label className="block text-sm font-medium mb-2">Category *</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Investment, Advisory, M&A"
            />
          </div>
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
              placeholder="e.g., Nairobi, Kenya"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Impact Summary *</label>
            <input
              type="text"
              required
              value={formData.impact}
              onChange={(e) =>
                setFormData({ ...formData, impact: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Short impact summary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
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
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            required
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Metrics */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Metrics</label>
            <Button type="button" size="sm" variant="outline" onClick={addMetric}>
              <Plus className="w-4 h-4 mr-1" />
              Add Metric
            </Button>
          </div>
          {formData.metrics.map((metric, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={metric.label}
                onChange={(e) => {
                  const newMetrics = [...formData.metrics];
                  newMetrics[index].label = e.target.value;
                  setFormData({ ...formData, metrics: newMetrics });
                }}
                className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Metric label (e.g., Amount Raised)"
              />
              <input
                type="text"
                value={metric.value}
                onChange={(e) => {
                  const newMetrics = [...formData.metrics];
                  newMetrics[index].value = e.target.value;
                  setFormData({ ...formData, metrics: newMetrics });
                }}
                className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Metric value (e.g., $50M)"
              />
              {formData.metrics.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removeMetric(index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>

        <div className="flex gap-2">
          <Button type="submit" variant="hero">
            {impactStory ? "Update" : "Create"} Impact Story
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


