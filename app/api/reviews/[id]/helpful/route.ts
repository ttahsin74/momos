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

    const review = await prisma.review.update({
      where: { id },
      data: {
        helpful: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ helpful: review.helpful });
  } catch (error) {
    console.error("Error updating helpful count:", error);
    return NextResponse.json(
      { error: "Failed to update helpful count" },
      { status: 500 }
    );
  }
}
