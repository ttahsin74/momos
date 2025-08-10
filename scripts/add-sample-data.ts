// Test script to add sample data to the database
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addSampleData() {
  try {
    console.log("Adding sample categories...");

    // Add categories
    const categories = [
      {
        category_name: "Italian",
        category_description: "Traditional Italian cuisine and pizzerias",
      },
      {
        category_name: "Asian",
        category_description: "Asian fusion, Chinese, Japanese, Thai cuisine",
      },
      {
        category_name: "American",
        category_description: "American classics, burgers, and casual dining",
      },
      {
        category_name: "Mexican",
        category_description: "Mexican and Tex-Mex cuisine",
      },
      {
        category_name: "Fast Food",
        category_description: "Quick service restaurants and fast food chains",
      },
      {
        category_name: "Fine Dining",
        category_description:
          "Upscale restaurants with premium dining experience",
      },
      {
        category_name: "Cafe",
        category_description: "Coffee shops, cafes, and light dining",
      },
      {
        category_name: "Indian",
        category_description: "Indian and South Asian cuisine",
      },
    ];

    for (const cat of categories) {
      const existing = await prisma.categories.findFirst({
        where: { category_name: cat.category_name },
      });

      if (!existing) {
        await prisma.categories.create({ data: cat });
        console.log(`Created category: ${cat.category_name}`);
      } else {
        console.log(`Category already exists: ${cat.category_name}`);
      }
    }

    console.log("Adding sample users...");

    // Add sample users
    const users = [
      {
        username: "foodlover123",
        email: "john@example.com",
        password_hash: "hashed_password_123",
        first_name: "John",
        last_name: "Doe",
        city: "New York",
        state: "NY",
        country: "USA",
      },
      {
        username: "reviewer456",
        email: "jane@example.com",
        password_hash: "hashed_password_456",
        first_name: "Jane",
        last_name: "Smith",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
      },
    ];

    for (const user of users) {
      const existing = await prisma.users.findFirst({
        where: { username: user.username },
      });

      if (!existing) {
        await prisma.users.create({ data: user });
        console.log(`Created user: ${user.username}`);
      } else {
        console.log(`User already exists: ${user.username}`);
      }
    }

    console.log("Sample data added successfully!");

    // Display current counts
    const categoryCount = await prisma.categories.count();
    const userCount = await prisma.users.count();
    const restaurantCount = await prisma.restaurants.count();
    const reviewCount = await prisma.reviews.count();

    console.log("\nDatabase summary:");
    console.log(`Categories: ${categoryCount}`);
    console.log(`Users: ${userCount}`);
    console.log(`Restaurants: ${restaurantCount}`);
    console.log(`Reviews: ${reviewCount}`);
  } catch (error) {
    console.error("Error adding sample data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleData();
