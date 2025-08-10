import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews/[id] - Get a specific review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        restaurant: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // No need to parse photos for PostgreSQL arrays
    return NextResponse.json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// PUT /api/reviews/[id] - Update a review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const updateData: any = { ...body };

    // Photos are already arrays for PostgreSQL, no need to stringify

    const review = await prisma.review.update({
      where: { id },
      data: updateData,
    });

    // If rating was updated, recalculate restaurant's average rating
    if (body.rating) {
      const reviews = await prisma.review.findMany({
        where: { restaurantId: review.restaurantId },
      });

      const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      await prisma.restaurant.update({
        where: { id: review.restaurantId },
        data: {
          rating: Math.round(avgRating * 10) / 10,
        },
      });
    }

    // Return review - no need to parse photos for PostgreSQL arrays
    return NextResponse.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete a review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    await prisma.review.delete({
      where: { id },
    });

    // Recalculate restaurant's average rating and review count
    const remainingReviews = await prisma.review.findMany({
      where: { restaurantId: review.restaurantId },
    });

    const avgRating =
      remainingReviews.length > 0
        ? remainingReviews.reduce((sum, r) => sum + r.rating, 0) /
          remainingReviews.length
        : 0;

    await prisma.restaurant.update({
      where: { id: review.restaurantId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: remainingReviews.length,
      },
    });

    return NextResponse.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}

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
