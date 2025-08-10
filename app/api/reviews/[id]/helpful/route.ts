import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/reviews/[id]/helpful - Increment helpful count
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    // Note: The current schema doesn't have a helpful_count field in Reviews
    // We would need to add this field to the schema or track it differently
    // For now, let's return an error indicating this feature isn't implemented

    return NextResponse.json(
      { error: "Helpful count feature not implemented in current schema" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error updating helpful count:", error);
    return NextResponse.json(
      { error: "Failed to update helpful count" },
      { status: 500 }
    );
  }
}
