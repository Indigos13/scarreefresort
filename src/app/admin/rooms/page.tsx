"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  BedDouble,
  Bath,
  Users,
  DollarSign,
  Loader2,
  Calendar,
  X,
  ImageIcon,
  Tag,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Room {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  addGuestPrice: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  amenities: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RoomFormData {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  basePrice: number;
  addGuestPrice: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery: string[];
  amenities: string[];
  isActive: boolean;
}

const emptyFormData: RoomFormData = {
  name: "",
  slug: "",
  tagline: "",
  description: "",
  basePrice: 0,
  addGuestPrice: 0,
  maxGuests: 2,
  bedrooms: 1,
  bathrooms: 1,
  image: "",
  gallery: [],
  amenities: [],
  isActive: true,
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<RoomFormData>(emptyFormData);
  const [newAmenity, setNewAmenity] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/rooms");
      const data = await res.json();
      if (data.rooms) {
        setRooms(data.rooms);
      }
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const openCreateDialog = () => {
    setEditingRoom(null);
    setFormData(emptyFormData);
    setNewAmenity("");
    setNewGalleryUrl("");
    setDialogOpen(true);
  };

  const openEditDialog = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      slug: room.slug,
      tagline: room.tagline || "",
      description: room.description || "",
      basePrice: room.basePrice,
      addGuestPrice: room.addGuestPrice,
      maxGuests: room.maxGuests,
      bedrooms: room.bedrooms,
      bathrooms: room.bathrooms,
      image: room.image || "",
      gallery: room.gallery || [],
      amenities: room.amenities || [],
      isActive: room.isActive,
    });
    setNewAmenity("");
    setNewGalleryUrl("");
    setDialogOpen(true);
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      // Auto-generate slug only when creating new
      slug: editingRoom ? prev.slug : slugify(name),
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.slug.trim()) return;
    setSaving(true);

    try {
      if (editingRoom) {
        // Update
        const res = await fetch("/api/admin/rooms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingRoom.id, ...formData }),
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Failed to update room");
          return;
        }
      } else {
        // Create
        const res = await fetch("/api/admin/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.error || "Failed to create room");
          return;
        }
      }

      setDialogOpen(false);
      await fetchRooms();
    } catch (error) {
      console.error("Save error:", error);
      alert("An error occurred while saving");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/admin/rooms", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setDeleteConfirm(null);
      await fetchRooms();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleToggleActive = async (room: Room) => {
    try {
      await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: room.id, isActive: !room.isActive }),
      });
      await fetchRooms();
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const addAmenity = () => {
    if (!newAmenity.trim()) return;
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, newAmenity.trim()],
    }));
    setNewAmenity("");
  };

  const removeAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  const addGalleryUrl = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newGalleryUrl.trim()],
    }));
    setNewGalleryUrl("");
  };

  const removeGalleryUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-10 flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-2 text-neutral-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading rooms...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white font-[var(--font-outfit)]">
            Room Management
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Add, edit, and manage your villa rooms
          </p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold shadow-lg shadow-amber-500/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Room
        </Button>
      </div>

      {/* Room Cards Grid */}
      {rooms.length === 0 ? (
        <div className="text-center py-16">
          <BedDouble className="h-12 w-12 text-neutral-700 mx-auto mb-4" />
          <p className="text-neutral-400 text-lg mb-2">No rooms yet</p>
          <p className="text-neutral-600 text-sm mb-6">
            Start by adding your first villa room
          </p>
          <Button
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add First Room
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`group bg-white/5 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 ${
                room.isActive
                  ? "border-white/10"
                  : "border-red-500/20 opacity-60"
              }`}
            >
              {/* Room Image */}
              <div className="relative h-44 bg-neutral-800 overflow-hidden">
                {room.image ? (
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-10 w-10 text-neutral-700" />
                  </div>
                )}
                {/* Status badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${
                      room.isActive
                        ? "bg-green-500/90 text-white border-green-400/30"
                        : "bg-red-500/90 text-white border-red-400/30"
                    } backdrop-blur-sm`}
                  >
                    {room.isActive ? (
                      <Eye className="mr-1 h-3 w-3" />
                    ) : (
                      <EyeOff className="mr-1 h-3 w-3" />
                    )}
                    {room.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditDialog(room)}
                    className="h-8 w-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-amber-500 transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(room.id)}
                    className="h-8 w-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Room Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">{room.name}</h3>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {room.tagline}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-neutral-300">
                      ${room.basePrice}
                      <span className="text-neutral-600">/night</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-neutral-300">
                      Max {room.maxGuests}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BedDouble className="h-3.5 w-3.5 text-purple-400" />
                    <span className="text-neutral-300">
                      {room.bedrooms} bed{room.bedrooms > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bath className="h-3.5 w-3.5 text-cyan-400" />
                    <span className="text-neutral-300">
                      {room.bathrooms} bath{room.bathrooms > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {/* Amenities preview */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {room.amenities.slice(0, 4).map((amenity, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="bg-white/5 text-neutral-400 border-white/10 text-xs"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {room.amenities.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="bg-white/5 text-neutral-500 border-white/10 text-xs"
                      >
                        +{room.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(room)}
                    className="flex-1 text-neutral-400 hover:text-white hover:bg-white/5 text-xs"
                  >
                    <Pencil className="mr-1.5 h-3 w-3" />
                    Edit
                  </Button>
                  <Link
                    href={`/admin/rooms/${room.id}/calendar`}
                    className="flex-1"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-neutral-400 hover:text-amber-400 hover:bg-amber-500/5 text-xs"
                    >
                      <Calendar className="mr-1.5 h-3 w-3" />
                      Calendar
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 ml-auto">
                    <Switch
                      checked={room.isActive}
                      onCheckedChange={() => handleToggleActive(room)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent className="bg-neutral-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Room</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Are you sure you want to delete this room? This action cannot be
              undone. All calendar sync data associated with this room will also
              be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDeleteConfirm(null)}
              className="text-neutral-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="bg-red-500 hover:bg-red-400 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Room Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-neutral-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </DialogTitle>
            <DialogDescription className="text-neutral-400">
              {editingRoom
                ? "Update room details, pricing, and amenities"
                : "Fill in the details to create a new room"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-300">Room Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Scar Reef Villa"
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300">URL Slug *</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: slugify(e.target.value),
                      }))
                    }
                    placeholder="auto-generated-from-name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300">Tagline</Label>
                <Input
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="e.g. Perched above the reef with panoramic views"
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300">Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the room in detail..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Pricing (USD)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-300">
                    Base Price / Night
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      type="number"
                      min={0}
                      value={formData.basePrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          basePrice: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="bg-white/5 border-white/10 text-white pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300">
                    Additional Guest Price
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                    <Input
                      type="number"
                      min={0}
                      value={formData.addGuestPrice}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          addGuestPrice: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="bg-white/5 border-white/10 text-white pl-9"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Room Details
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-neutral-300">Max Guests</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.maxGuests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxGuests: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300">Bedrooms</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.bedrooms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bedrooms: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-300">Bathrooms</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.bathrooms}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        bathrooms: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Images
              </h4>
              <div className="space-y-2">
                <Label className="text-neutral-300">Main Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/images/my-villa.png or https://..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300">Gallery Images</Label>
                <div className="flex gap-2">
                  <Input
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    placeholder="Add gallery image URL..."
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryUrl())}
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                  />
                  <Button
                    type="button"
                    onClick={addGalleryUrl}
                    disabled={!newGalleryUrl.trim()}
                    variant="outline"
                    className="shrink-0 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.gallery.length > 0 && (
                  <div className="space-y-1.5 mt-2">
                    {formData.gallery.map((url, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2"
                      >
                        <ImageIcon className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                        <span className="text-neutral-300 text-xs font-mono truncate flex-1">
                          {url}
                        </span>
                        <button
                          onClick={() => removeGalleryUrl(i)}
                          className="text-neutral-500 hover:text-red-400 shrink-0"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                Amenities
              </h4>
              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="e.g. WiFi, Pool, Air Conditioning..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                  className="bg-white/5 border-white/10 text-white placeholder:text-neutral-600"
                />
                <Button
                  type="button"
                  onClick={addAmenity}
                  disabled={!newAmenity.trim()}
                  variant="outline"
                  className="shrink-0 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, i) => (
                    <Badge
                      key={i}
                      className="bg-amber-500/10 text-amber-300 border-amber-500/20 pr-1.5 gap-1"
                    >
                      <Tag className="h-3 w-3" />
                      {amenity}
                      <button
                        onClick={() => removeAmenity(i)}
                        className="ml-1 hover:text-red-400 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div>
                <p className="text-white text-sm font-medium">Room Active</p>
                <p className="text-neutral-500 text-xs mt-0.5">
                  Inactive rooms won&apos;t appear on the public website
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isActive: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-neutral-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !formData.name.trim() || !formData.slug.trim()}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingRoom ? (
                "Update Room"
              ) : (
                "Create Room"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
