import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/reviews - Get all reviews or reviews for a specific restaurant
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");

    const where: any = {};

    if (restaurantId) {
      where.restaurantId = parseInt(restaurantId);
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        restaurant: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // No need to parse photos for PostgreSQL arrays
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
    if (
      !body.restaurantId ||
      !body.userName ||
      !body.rating ||
      !body.title ||
      !body.text
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        restaurantId: parseInt(body.restaurantId),
        userName: body.userName,
        rating: parseInt(body.rating),
        date: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
        title: body.title,
        text: body.text,
        helpful: 0,
        photos: body.photos || [],
      },
    });

    // Update restaurant's average rating and review count
    const reviews = await prisma.review.findMany({
      where: { restaurantId: parseInt(body.restaurantId) },
    });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.restaurant.update({
      where: { id: parseInt(body.restaurantId) },
      data: {
        rating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
        reviewCount: reviews.length,
      },
    });

    // Return review - no need to parse photos for PostgreSQL arrays
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
