import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/restaurants - Get all restaurants with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const city = searchParams.get("city");
    const category = searchParams.get("category");
    const price_range = searchParams.get("price_range");
    const verified_only = searchParams.get("verified_only");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build where clause
    const where: any = {
      is_active: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (city) {
      where.city = { contains: city, mode: "insensitive" };
    }

    if (price_range) {
      where.price_range = parseInt(price_range);
    }

    if (verified_only === "true") {
      where.is_verified = true;
    }

    if (category) {
      where.restaurantCategories = {
        some: {
          category: {
            category_name: { contains: category, mode: "insensitive" },
          },
        },
      };
    }

    const restaurants = await prisma.restaurants.findMany({
      where,
      include: {
        restaurantCategories: {
          include: {
            category: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        created_date: "desc",
      },
      take: limit,
      skip: offset,
    });

    // Get total count for pagination
    const total = await prisma.restaurants.count({ where });

    return NextResponse.json({
      restaurants,
      pagination: {
        total,
        limit,
        offset,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}

// POST /api/restaurants - Create a new restaurant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      address,
      city,
      state,
      zip_code,
      website,
      price_range,
      category_ids,
    } = body;

    if (!name || !address || !city) {
      return NextResponse.json(
        { error: "Name, address, and city are required" },
        { status: 400 }
      );
    }

    // Create restaurant with categories
    const restaurant = await prisma.restaurants.create({
      data: {
        name,
        description,
        address,
        city,
        state,
        zip_code,
        website,
        price_range: price_range ? parseInt(price_range) : null,
        restaurantCategories: category_ids
          ? {
              create: category_ids.map((id: number) => ({
                category_id: id,
              })),
            }
          : undefined,
      },
      include: {
        restaurantCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 }
    );
  }
}
