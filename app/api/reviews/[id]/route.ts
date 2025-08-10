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

    const review = await prisma.reviews.findUnique({
      where: { review_id: id },
      include: {
        restaurant: {
          select: {
            restaurant_id: true,
            name: true,
          },
        },
        user: {
          select: {
            user_id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

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

    // Validate rating if provided
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (body.rating !== undefined) updateData.rating = parseInt(body.rating);
    if (body.review_title !== undefined)
      updateData.review_title = body.review_title;
    if (body.review_text !== undefined)
      updateData.review_text = body.review_text;
    if (body.is_recommended !== undefined)
      updateData.is_recommended = body.is_recommended;
    if (body.moderation_status !== undefined)
      updateData.moderation_status = body.moderation_status;

    updateData.updated_date = new Date();

    const review = await prisma.reviews.update({
      where: { review_id: id },
      data: updateData,
      include: {
        restaurant: {
          select: {
            restaurant_id: true,
            name: true,
          },
        },
        user: {
          select: {
            user_id: true,
            username: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    // If rating was updated, recalculate restaurant's average rating
    if (body.rating) {
      const reviews = await prisma.reviews.findMany({
        where: {
          restaurant_id: review.restaurant_id,
          is_active: true,
        },
      });

      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
            reviews.length
          : 0;

      await prisma.restaurants.update({
        where: { restaurant_id: review.restaurant_id },
        data: {
          average_rating: Math.round(avgRating * 100) / 100,
          total_reviews: reviews.length,
        },
      });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete a review (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid review ID" }, { status: 400 });
    }

    const review = await prisma.reviews.findUnique({
      where: { review_id: id },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Soft delete by setting is_active to false
    await prisma.reviews.update({
      where: { review_id: id },
      data: { is_active: false },
    });

    // Recalculate restaurant's average rating and review count
    const remainingReviews = await prisma.reviews.findMany({
      where: {
        restaurant_id: review.restaurant_id,
        is_active: true,
      },
    });

    const avgRating =
      remainingReviews.length > 0
        ? remainingReviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
          remainingReviews.length
        : 0;

    await prisma.restaurants.update({
      where: { restaurant_id: review.restaurant_id },
      data: {
        average_rating: Math.round(avgRating * 100) / 100,
        total_reviews: remainingReviews.length,
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
