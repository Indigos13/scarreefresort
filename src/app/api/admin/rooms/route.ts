export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { villas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET — List all rooms
export async function GET() {
  try {
    const allVillas = await db.select().from(villas);
    // Parse JSON fields
    const parsed = allVillas.map((v) => ({
      ...v,
      gallery: JSON.parse(v.gallery || "[]"),
      amenities: JSON.parse(v.amenities || "[]"),
    }));
    return NextResponse.json({ rooms: parsed });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}

// POST — Create a new room
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      tagline,
      description,
      basePrice,
      addGuestPrice,
      maxGuests,
      bedrooms,
      bathrooms,
      image,
      gallery,
      amenities,
      isActive,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "name and slug are required" },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await db
      .select()
      .from(villas)
      .where(eq(villas.slug, slug));
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A room with this slug already exists" },
        { status: 409 }
      );
    }

    const newRoom = await db
      .insert(villas)
      .values({
        slug,
        name,
        tagline: tagline || "",
        description: description || "",
        basePrice: basePrice || 0,
        addGuestPrice: addGuestPrice || 0,
        maxGuests: maxGuests || 2,
        bedrooms: bedrooms || 1,
        bathrooms: bathrooms || 1,
        image: image || "",
        gallery: JSON.stringify(gallery || []),
        amenities: JSON.stringify(amenities || []),
        isActive: isActive !== undefined ? isActive : true,
      })
      .returning();

    const room = newRoom[0];
    return NextResponse.json(
      {
        room: {
          ...room,
          gallery: JSON.parse(room.gallery || "[]"),
          amenities: JSON.parse(room.amenities || "[]"),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  }
}

// PUT — Update an existing room
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    // Check slug uniqueness if updating slug
    if (updates.slug) {
      const existing = await db
        .select()
        .from(villas)
        .where(eq(villas.slug, updates.slug));
      if (existing.length > 0 && existing[0].id !== id) {
        return NextResponse.json(
          { error: "A room with this slug already exists" },
          { status: 409 }
        );
      }
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
    };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.slug !== undefined) updateData.slug = updates.slug;
    if (updates.tagline !== undefined) updateData.tagline = updates.tagline;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.basePrice !== undefined)
      updateData.basePrice = updates.basePrice;
    if (updates.addGuestPrice !== undefined)
      updateData.addGuestPrice = updates.addGuestPrice;
    if (updates.maxGuests !== undefined)
      updateData.maxGuests = updates.maxGuests;
    if (updates.bedrooms !== undefined) updateData.bedrooms = updates.bedrooms;
    if (updates.bathrooms !== undefined)
      updateData.bathrooms = updates.bathrooms;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.gallery !== undefined)
      updateData.gallery = JSON.stringify(updates.gallery);
    if (updates.amenities !== undefined)
      updateData.amenities = JSON.stringify(updates.amenities);
    if (updates.isActive !== undefined) updateData.isActive = updates.isActive;

    await db.update(villas).set(updateData).where(eq(villas.id, id));

    // Fetch updated room
    const updated = await db.select().from(villas).where(eq(villas.id, id));
    if (updated.length === 0) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    const room = updated[0];
    return NextResponse.json({
      room: {
        ...room,
        gallery: JSON.parse(room.gallery || "[]"),
        amenities: JSON.parse(room.amenities || "[]"),
      },
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room" },
      { status: 500 }
    );
  }
}

// DELETE — Delete a room
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    await db.delete(villas).where(eq(villas.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room" },
      { status: 500 }
    );
  }
}
