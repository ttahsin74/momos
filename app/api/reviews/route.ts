import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews - Get all reviews or reviews for a specific restaurant
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurant_id = searchParams.get("restaurant_id");
    const user_id = searchParams.get("user_id");
    const min_rating = searchParams.get("min_rating");

    const where: any = {
      is_active: true,
    };

    if (restaurant_id) {
      where.restaurant_id = parseInt(restaurant_id);
    }

    if (user_id) {
      where.user_id = parseInt(user_id);
    }

    if (min_rating) {
      where.rating = {
        gte: parseInt(min_rating),
      };
    }

    const reviews = await prisma.reviews.findMany({
      where,
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
      orderBy: { created_date: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.restaurant_id || !body.user_id || !body.rating) {
      return NextResponse.json(
        { error: "Missing required fields: restaurant_id, user_id, rating" },
        { status: 400 }
      );
    }

    // Validate rating range
    if (body.rating < 1 || body.rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.reviews.create({
      data: {
        restaurant_id: parseInt(body.restaurant_id),
        user_id: parseInt(body.user_id),
        rating: parseInt(body.rating),
        review_title: body.review_title || null,
        review_text: body.review_text || null,
        is_recommended: body.is_recommended || null,
        moderation_status: "approved", // Default to approved
      },
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

    // Update restaurant's average rating and review count
    const allReviews = await prisma.reviews.findMany({
      where: {
        restaurant_id: parseInt(body.restaurant_id),
        is_active: true,
      },
    });

    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
        : 0;

    await prisma.restaurants.update({
      where: { restaurant_id: parseInt(body.restaurant_id) },
      data: {
        average_rating: Math.round(avgRating * 100) / 100, // Round to 2 decimal places
        total_reviews: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
