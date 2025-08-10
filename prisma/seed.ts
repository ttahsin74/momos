import { PrismaClient } from "@prisma/client";
import { restaurants, reviews } from "../data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create restaurants
  for (const restaurant of restaurants) {
    await prisma.restaurant.upsert({
      where: { id: restaurant.id },
      update: {},
      create: {
        id: restaurant.id,
        name: restaurant.name,
        rating: restaurant.rating,
        reviewCount: restaurant.reviewCount,
        cuisine: restaurant.cuisine,
        priceRange: restaurant.priceRange,
        distance: restaurant.distance,
        address: restaurant.address,
        phone: restaurant.phone,
        hours: restaurant.hours,
        description: restaurant.description,
        imageUrl: restaurant.imageUrl,
      },
    });
  }

  // Create reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        restaurantId: review.restaurantId,
        userName: review.userName,
        rating: review.rating,
        date: review.date,
        title: review.title,
        text: review.text,
        helpful: review.helpful,
        photos: review.photos || [],
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
