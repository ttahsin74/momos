import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/stats - Get application statistics
export async function GET(request: NextRequest) {
  try {
    const [
      totalRestaurants,
      totalReviews,
      avgRating,
      totalUsers,
      totalCategories,
      topCategories,
    ] = await Promise.all([
      // Total restaurants
      prisma.restaurants.count({
        where: { is_active: true },
      }),

      // Total reviews
      prisma.reviews.count({
        where: { is_active: true },
      }),

      // Average rating across all restaurants
      prisma.restaurants.aggregate({
        where: { is_active: true },
        _avg: {
          average_rating: true,
        },
      }),

      // Total users
      prisma.users.count({
        where: { is_active: true },
      }),

      // Total categories
      prisma.categories.count({
        where: { is_active: true },
      }),

      // Top categories by restaurant count
      prisma.categories.findMany({
        where: { is_active: true },
        include: {
          _count: {
            select: {
              restaurantCategories: true,
            },
          },
        },
        orderBy: {
          restaurantCategories: {
            _count: "desc",
          },
        },
        take: 5,
      }),
    ]);

    const stats = {
      totalRestaurants,
      totalReviews,
      totalUsers,
      totalCategories,
      averageRating: avgRating._avg.average_rating || 0,
      topCategories: topCategories.map((category: any) => ({
        category_name: category.category_name,
        restaurant_count: category._count.restaurantCategories,
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
