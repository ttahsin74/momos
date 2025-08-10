import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log("🔍 Checking database contents...\n");

    // Count restaurants
    const restaurantCount = await prisma.restaurant.count();
    console.log(`📍 Restaurants: ${restaurantCount}`);

    // Count reviews
    const reviewCount = await prisma.review.count();
    console.log(`⭐ Reviews: ${reviewCount}`);

    // Get sample restaurant with reviews
    const sampleRestaurant = await prisma.restaurant.findFirst({
      include: {
        reviews: true,
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (sampleRestaurant) {
      console.log(`\n🍽️  Sample Restaurant:`);
      console.log(`   Name: ${sampleRestaurant.name}`);
      console.log(`   Cuisine: ${sampleRestaurant.cuisine}`);
      console.log(`   Rating: ${sampleRestaurant.rating}`);
      console.log(`   Review Count: ${sampleRestaurant._count.reviews}`);
      console.log(`   Actual Reviews: ${sampleRestaurant.reviews.length}`);
    }

    // Get sample review
    const sampleReview = await prisma.review.findFirst({
      include: {
        restaurant: {
          select: { name: true },
        },
      },
    });

    if (sampleReview) {
      console.log(`\n📝 Sample Review:`);
      console.log(`   Title: ${sampleReview.title}`);
      console.log(`   Rating: ${sampleReview.rating}/5`);
      console.log(`   Restaurant: ${sampleReview.restaurant.name}`);
      console.log(`   User: ${sampleReview.userName}`);
      console.log(`   Helpful: ${sampleReview.helpful}`);
    }

    console.log("\n✅ Database check completed successfully!");
  } catch (error) {
    console.error("❌ Database check failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
