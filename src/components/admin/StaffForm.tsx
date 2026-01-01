import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface StaffFormProps {
  staff?: any;
  onClose: () => void;
  onSave: () => void;
}

export function StaffForm({ staff, onClose, onSave }: StaffFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    orderIndex: 0,
    published: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        role: staff.role || "",
        bio: staff.bio || "",
        orderIndex: staff.orderIndex || 0,
        published: staff.published !== undefined ? staff.published : true,
      });
    }
  }, [staff]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (staff) {
        await api.updateStaff(staff.id, formData);
        toast({
          title: "Success",
          description: "Staff member updated successfully",
        });
      } else {
        await api.createStaff(formData);
        toast({
          title: "Success",
          description: "Staff member created successfully",
        });
      }
      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save staff member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white border border-border p-6">
      <h2 className="font-heading text-2xl mb-4">
        {staff ? "Edit Staff Member" : "Add New Staff Member"}
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Bio *</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
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
            {staff ? "Update" : "Create"} Staff Member
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}




