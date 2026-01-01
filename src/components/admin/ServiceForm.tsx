import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ServiceFormProps {
  service?: any;
  onClose: () => void;
  onSave: () => void;
}

export function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    heroImage: "",
    overview: "",
    capabilities: [""],
    approach: [{ title: "", description: "" }],
    stats: [{ value: "", label: "" }],
    icon: "",
    orderIndex: 0,
    published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (service) {
      setFormData({
        slug: service.slug || "",
        title: service.title || "",
        subtitle: service.subtitle || "",
        description: service.description || "",
        heroImage: service.heroImage || "",
        overview: service.overview || "",
        capabilities: service.capabilities || [""],
        approach: service.approach || [{ title: "", description: "" }],
        stats: service.stats || [{ value: "", label: "" }],
        icon: service.icon || "",
        orderIndex: service.orderIndex || 0,
        published: service.published || false,
      });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        capabilities: formData.capabilities.filter((c) => c.trim()),
        approach: formData.approach.filter((a) => a.title.trim() || a.description.trim()),
        stats: formData.stats.filter((s) => s.value.trim() || s.label.trim()),
      };

      if (service) {
        await api.updateService(service.id, data);
        toast({
          title: "Success",
          description: "Service updated successfully",
        });
      } else {
        await api.createService(data);
        toast({
          title: "Success",
          description: "Service created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save service",
        variant: "destructive",
      });
    }
  };

  const addCapability = () => {
    setFormData({
      ...formData,
      capabilities: [...formData.capabilities, ""],
    });
  };

  const removeCapability = (index: number) => {
    setFormData({
      ...formData,
      capabilities: formData.capabilities.filter((_, i) => i !== index),
    });
  };

  const addApproach = () => {
    setFormData({
      ...formData,
      approach: [...formData.approach, { title: "", description: "" }],
    });
  };

  const removeApproach = (index: number) => {
    setFormData({
      ...formData,
      approach: formData.approach.filter((_, i) => i !== index),
    });
  };

  const addStat = () => {
    setFormData({
      ...formData,
      stats: [...formData.stats, { value: "", label: "" }],
    });
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {service ? "Edit Service" : "Add New Service"}
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
              placeholder="service-slug"
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
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Icon name"
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
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Overview *</label>
          <textarea
            required
            rows={4}
            value={formData.overview}
            onChange={(e) =>
              setFormData({ ...formData, overview: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Capabilities */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Capabilities</label>
            <Button type="button" size="sm" variant="outline" onClick={addCapability}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {formData.capabilities.map((capability, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={capability}
                onChange={(e) => {
                  const newCapabilities = [...formData.capabilities];
                  newCapabilities[index] = e.target.value;
                  setFormData({ ...formData, capabilities: newCapabilities });
                }}
                className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Capability"
              />
              {formData.capabilities.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removeCapability(index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Approach Steps */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Approach Steps</label>
            <Button type="button" size="sm" variant="outline" onClick={addApproach}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {formData.approach.map((step, index) => (
            <div key={index} className="border border-border p-4 mb-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const newApproach = [...formData.approach];
                    newApproach[index].title = e.target.value;
                    setFormData({ ...formData, approach: newApproach });
                  }}
                  className="px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Step title"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={step.description}
                    onChange={(e) => {
                      const newApproach = [...formData.approach];
                      newApproach[index].description = e.target.value;
                      setFormData({ ...formData, approach: newApproach });
                    }}
                    className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Step description"
                  />
                  {formData.approach.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => removeApproach(index)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Statistics</label>
            <Button type="button" size="sm" variant="outline" onClick={addStat}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {formData.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const newStats = [...formData.stats];
                  newStats[index].value = e.target.value;
                  setFormData({ ...formData, stats: newStats });
                }}
                className="px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Value (e.g., $2.8B)"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => {
                    const newStats = [...formData.stats];
                    newStats[index].label = e.target.value;
                    setFormData({ ...formData, stats: newStats });
                  }}
                  className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Label"
                />
                {formData.stats.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => removeStat(index)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
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
            {service ? "Update" : "Create"} Service
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

