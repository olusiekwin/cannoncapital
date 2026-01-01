import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
  onSave: () => void;
}

export function ProjectForm({ project, onClose, onSave }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    value: "",
    status: "Active",
    duration: "",
    location: "",
    description: "",
    heroImage: "",
    challenge: "",
    strategy: "",
    outcomes: [""],
    tools: [""],
    isActive: true,
    published: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        category: project.category || "",
        value: project.value || "",
        status: project.status || "Active",
        duration: project.duration || "",
        location: project.location || "",
        description: project.description || "",
        heroImage: project.heroImage || "",
        challenge: project.challenge || "",
        strategy: project.strategy || "",
        outcomes: project.outcomes || [""],
        tools: project.tools || [""],
        isActive: project.isActive !== undefined ? project.isActive : true,
        published: project.published || false,
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        outcomes: formData.outcomes.filter((o) => o.trim()),
        tools: formData.tools.filter((t) => t.trim()),
      };

      if (project) {
        await api.updateProject(project.id, data);
        toast({
          title: "Success",
          description: "Project updated successfully",
        });
      } else {
        await api.createProject(data);
        toast({
          title: "Success",
          description: "Project created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive",
      });
    }
  };

  const addOutcome = () => {
    setFormData({
      ...formData,
      outcomes: [...formData.outcomes, ""],
    });
  };

  const removeOutcome = (index: number) => {
    setFormData({
      ...formData,
      outcomes: formData.outcomes.filter((_, i) => i !== index),
    });
  };

  const addTool = () => {
    setFormData({
      ...formData,
      tools: [...formData.tools, ""],
    });
  };

  const removeTool = (index: number) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {project ? "Edit Project" : "Add New Project"}
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Value</label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) =>
                setFormData({ ...formData, value: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="$450M"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status *</label>
            <select
              required
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="2023 - Present"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Western Europe"
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
          <label className="block text-sm font-medium mb-2">Challenge</label>
          <textarea
            rows={4}
            value={formData.challenge}
            onChange={(e) =>
              setFormData({ ...formData, challenge: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Strategy</label>
          <textarea
            rows={4}
            value={formData.strategy}
            onChange={(e) =>
              setFormData({ ...formData, strategy: e.target.value })
            }
            className="w-full px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Outcomes */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Outcomes</label>
            <Button type="button" size="sm" variant="outline" onClick={addOutcome}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {formData.outcomes.map((outcome, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={outcome}
                onChange={(e) => {
                  const newOutcomes = [...formData.outcomes];
                  newOutcomes[index] = e.target.value;
                  setFormData({ ...formData, outcomes: newOutcomes });
                }}
                className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Outcome"
              />
              {formData.outcomes.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removeOutcome(index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Tools */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Tools</label>
            <Button type="button" size="sm" variant="outline" onClick={addTool}>
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
          {formData.tools.map((tool, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tool}
                onChange={(e) => {
                  const newTools = [...formData.tools];
                  newTools[index] = e.target.value;
                  setFormData({ ...formData, tools: newTools });
                }}
                className="flex-1 px-4 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tool"
              />
              {formData.tools.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => removeTool(index)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Active Project</label>
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
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="hero">
            {project ? "Update" : "Create"} Project
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}


