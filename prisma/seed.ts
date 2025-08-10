import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with new schema...");

  // Create categories
  const categories = [
    {
      category_name: "Fast Food",
      category_description: "Quick service restaurants",
    },
    {
      category_name: "Fine Dining",
      category_description: "Upscale restaurants",
    },
    {
      category_name: "Casual Dining",
      category_description: "Family-friendly restaurants",
    },
    { category_name: "Italian", category_description: "Italian cuisine" },
    { category_name: "Mexican", category_description: "Mexican cuisine" },
    { category_name: "Asian", category_description: "Asian cuisine" },
    { category_name: "American", category_description: "American cuisine" },
  ];

  for (const category of categories) {
    await prisma.categories.upsert({
      where: { category_id: categories.indexOf(category) + 1 },
      update: {},
      create: {
        category_id: categories.indexOf(category) + 1,
        ...category,
      },
    });
  }

  // Create test users
  const users = [
    {
      user_id: 1,
      username: "john_doe",
      email: "john@example.com",
      password_hash: "$2b$10$hash", // In real app, properly hash passwords
      first_name: "John",
      last_name: "Doe",
      is_verified: true,
    },
    {
      user_id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      password_hash: "$2b$10$hash",
      first_name: "Jane",
      last_name: "Smith",
      is_verified: true,
    },
    {
      user_id: 3,
      username: "mike_johnson",
      email: "mike@example.com",
      password_hash: "$2b$10$hash",
      first_name: "Mike",
      last_name: "Johnson",
      is_verified: true,
    },
  ];

  for (const user of users) {
    await prisma.users.upsert({
      where: { email: user.email },
      update: {},
      create: user,
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
