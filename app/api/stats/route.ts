import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/stats - Get application statistics
export async function GET(request: NextRequest) {
  try {
    const [totalRestaurants, totalReviews, avgRating, topCuisines] =
      await Promise.all([
        // Total restaurants
        prisma.restaurant.count(),

        // Total reviews
        prisma.review.count(),

        // Average rating across all restaurants
        prisma.restaurant.aggregate({
          _avg: {
            rating: true,
          },
        }),

        // Top cuisines
        prisma.restaurant.groupBy({
          by: ["cuisine"],
          _count: {
            cuisine: true,
          },
          orderBy: {
            _count: {
              cuisine: "desc",
            },
          },
          take: 5,
        }),
      ]);

    const stats = {
      totalRestaurants,
      totalReviews,
      averageRating: avgRating._avg.rating || 0,
      topCuisines: topCuisines.map((item) => ({
        cuisine: item.cuisine,
        count: item._count.cuisine,
      })),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
