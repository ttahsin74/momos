import { NextResponse } from "next/server";

// Comprehensive OpenAPI specification matching our Prisma schema
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Restaurant Review API",
    version: "1.0.0",
    description:
      "A comprehensive restaurant review and rating system API built with Next.js, Prisma, and PostgreSQL. This API provides full functionality for managing restaurants, reviews, users, categories, and more.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Restaurants",
      description: "Restaurant management endpoints",
    },
    {
      name: "Categories",
      description: "Category management endpoints",
    },
    {
      name: "Reviews",
      description: "Review management endpoints",
    },
    {
      name: "Users",
      description: "User management endpoints",
    },
    {
      name: "Stats",
      description: "Application statistics endpoints",
    },
  ],
  paths: {
    "/api/restaurants": {
      get: {
        tags: ["Restaurants"],
        summary: "Get all restaurants",
        description:
          "Retrieve a list of all restaurants with optional filtering and pagination",
        parameters: [
          {
            name: "search",
            in: "query",
            description: "Search term for restaurant name or description",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "city",
            in: "query",
            description: "Filter by city",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "category",
            in: "query",
            description: "Filter by category name",
            required: false,
            schema: { type: "string" },
          },
          {
            name: "price_range",
            in: "query",
            description: "Filter by price range (1-4)",
            required: false,
            schema: { type: "integer", minimum: 1, maximum: 4 },
          },
          {
            name: "verified_only",
            in: "query",
            description: "Show only verified restaurants",
            required: false,
            schema: { type: "boolean" },
          },
          {
            name: "limit",
            in: "query",
            description: "Number of results per page",
            required: false,
            schema: { type: "integer", default: 20 },
          },
          {
            name: "offset",
            in: "query",
            description: "Number of results to skip",
            required: false,
            schema: { type: "integer", default: 0 },
          },
        ],
        responses: {
          "200": {
            description: "List of restaurants retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    restaurants: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Restaurant" },
                    },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      post: {
        tags: ["Restaurants"],
        summary: "Create a new restaurant",
        description: "Add a new restaurant to the system",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateRestaurantRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Restaurant created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Restaurant" },
              },
            },
          },
          "400": {
            description: "Invalid request data",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/api/restaurants/{id}": {
      get: {
        tags: ["Restaurants"],
        summary: "Get restaurant by ID",
        description:
          "Retrieve a specific restaurant by its ID with full details",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Restaurant ID",
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Restaurant found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/RestaurantDetail" },
              },
            },
          },
          "404": {
            description: "Restaurant not found",
          },
          "400": {
            description: "Invalid restaurant ID",
          },
        },
      },
      put: {
        tags: ["Restaurants"],
        summary: "Update restaurant",
        description: "Update an existing restaurant",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Restaurant ID",
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateRestaurantRequest" },
            },
          },
        },
        responses: {
          "200": {
            description: "Restaurant updated successfully",
          },
          "404": {
            description: "Restaurant not found",
          },
          "400": {
            description: "Invalid request data",
          },
        },
      },
      delete: {
        tags: ["Restaurants"],
        summary: "Delete restaurant",
        description: "Delete a restaurant from the system",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "Restaurant ID",
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Restaurant deleted successfully",
          },
          "404": {
            description: "Restaurant not found",
          },
          "400": {
            description: "Invalid restaurant ID",
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        description:
          "Retrieve all restaurant categories with restaurant counts",
        responses: {
          "200": {
            description: "List of categories",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Category" },
                },
              },
            },
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a new category",
        description: "Add a new restaurant category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateCategoryRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Category created successfully",
          },
          "400": {
            description: "Invalid request data",
          },
          "409": {
            description: "Category already exists",
          },
        },
      },
    },
    "/api/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Get reviews",
        description: "Retrieve reviews with optional filtering",
        parameters: [
          {
            name: "restaurant_id",
            in: "query",
            description: "Filter by restaurant ID",
            required: false,
            schema: { type: "integer" },
          },
          {
            name: "user_id",
            in: "query",
            description: "Filter by user ID",
            required: false,
            schema: { type: "integer" },
          },
          {
            name: "min_rating",
            in: "query",
            description: "Minimum rating filter",
            required: false,
            schema: { type: "number", minimum: 1, maximum: 5 },
          },
        ],
        responses: {
          "200": {
            description: "List of reviews",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Review" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Create a new review",
        description: "Add a new restaurant review",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateReviewRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "Review created successfully",
          },
          "400": {
            description: "Invalid request data",
          },
        },
      },
    },
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Retrieve all users with pagination (admin endpoint)",
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "Number of results per page",
            required: false,
            schema: { type: "integer", default: 20 },
          },
          {
            name: "offset",
            in: "query",
            description: "Number of results to skip",
            required: false,
            schema: { type: "integer", default: 0 },
          },
        ],
        responses: {
          "200": {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    users: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" },
                    },
                    pagination: { $ref: "#/components/schemas/Pagination" },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create a new user",
        description: "Register a new user account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateUserRequest" },
            },
          },
        },
        responses: {
          "201": {
            description: "User created successfully",
          },
          "400": {
            description: "Invalid request data",
          },
          "409": {
            description: "User already exists",
          },
        },
      },
    },
    "/api/stats": {
      get: {
        tags: ["Stats"],
        summary: "Get application statistics",
        description: "Retrieve overall statistics about the application",
        responses: {
          "200": {
            description: "Application statistics",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Stats" },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Restaurant: {
        type: "object",
        properties: {
          restaurant_id: {
            type: "integer",
            description: "Unique restaurant identifier",
          },
          name: { type: "string", description: "Restaurant name" },
          description: {
            type: "string",
            description: "Restaurant description",
          },
          address: { type: "string", description: "Street address" },
          city: { type: "string", description: "City" },
          state: { type: "string", description: "State or province" },
          zip_code: { type: "string", description: "ZIP/postal code" },
          website: { type: "string", description: "Website URL" },
          hours_operation: {
            type: "object",
            description: "Operating hours as JSON",
          },
          price_range: {
            type: "integer",
            minimum: 1,
            maximum: 4,
            description: "Price range (1=$ to 4=$$$$)",
          },
          average_rating: {
            type: "number",
            minimum: 0,
            maximum: 5,
            description: "Average rating",
          },
          total_reviews: {
            type: "integer",
            description: "Total number of reviews",
          },
          latitude: { type: "number", description: "Latitude coordinate" },
          longitude: { type: "number", description: "Longitude coordinate" },
          is_verified: {
            type: "boolean",
            description: "Whether restaurant is verified",
          },
          is_active: {
            type: "boolean",
            description: "Whether restaurant is active",
          },
          created_date: { type: "string", format: "date-time" },
          updated_date: { type: "string", format: "date-time" },
        },
      },
      RestaurantDetail: {
        allOf: [
          { $ref: "#/components/schemas/Restaurant" },
          {
            type: "object",
            properties: {
              restaurantCategories: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: { $ref: "#/components/schemas/Category" },
                    is_primary: { type: "boolean" },
                  },
                },
              },
              reviews: {
                type: "array",
                items: { $ref: "#/components/schemas/Review" },
              },
              photos: {
                type: "array",
                items: { $ref: "#/components/schemas/Photo" },
              },
              _count: {
                type: "object",
                properties: {
                  reviews: { type: "integer" },
                  favorites: { type: "integer" },
                },
              },
            },
          },
        ],
      },
      CreateRestaurantRequest: {
        type: "object",
        required: ["name", "address", "city"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 255 },
          description: { type: "string", maxLength: 1000 },
          address: { type: "string", minLength: 1, maxLength: 255 },
          city: { type: "string", minLength: 1, maxLength: 100 },
          state: { type: "string", maxLength: 100 },
          zip_code: { type: "string", maxLength: 20 },
          website: { type: "string", maxLength: 255 },
          hours_operation: { type: "object" },
          price_range: { type: "integer", minimum: 1, maximum: 4 },
          category_ids: {
            type: "array",
            items: { type: "integer" },
            description:
              "Array of category IDs to associate with the restaurant",
          },
        },
      },
      UpdateRestaurantRequest: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 255 },
          description: { type: "string", maxLength: 1000 },
          address: { type: "string", maxLength: 255 },
          city: { type: "string", maxLength: 100 },
          state: { type: "string", maxLength: 100 },
          zip_code: { type: "string", maxLength: 20 },
          website: { type: "string", maxLength: 255 },
          hours_operation: { type: "object" },
          price_range: { type: "integer", minimum: 1, maximum: 4 },
          is_active: { type: "boolean" },
        },
      },
      Category: {
        type: "object",
        properties: {
          category_id: { type: "integer" },
          category_name: { type: "string" },
          category_description: { type: "string" },
          is_active: { type: "boolean" },
          created_date: { type: "string", format: "date-time" },
          _count: {
            type: "object",
            properties: {
              restaurantCategories: { type: "integer" },
            },
          },
        },
      },
      CreateCategoryRequest: {
        type: "object",
        required: ["category_name"],
        properties: {
          category_name: { type: "string", minLength: 1, maxLength: 100 },
          category_description: { type: "string", maxLength: 500 },
        },
      },
      Review: {
        type: "object",
        properties: {
          review_id: { type: "integer" },
          restaurant_id: { type: "integer" },
          user_id: { type: "integer" },
          rating: { type: "number", minimum: 1, maximum: 5 },
          review_title: { type: "string" },
          review_text: { type: "string" },
          visit_date: { type: "string", format: "date" },
          is_anonymous: { type: "boolean" },
          helpful_count: { type: "integer" },
          moderation_status: { type: "string" },
          created_date: { type: "string", format: "date-time" },
          updated_date: { type: "string", format: "date-time" },
          user: {
            type: "object",
            properties: {
              user_id: { type: "integer" },
              username: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
            },
          },
        },
      },
      CreateReviewRequest: {
        type: "object",
        required: ["restaurant_id", "user_id", "rating"],
        properties: {
          restaurant_id: { type: "integer" },
          user_id: { type: "integer" },
          rating: { type: "number", minimum: 1, maximum: 5 },
          review_title: { type: "string", maxLength: 255 },
          review_text: { type: "string", maxLength: 2000 },
          is_recommended: { type: "boolean" },
        },
      },
      User: {
        type: "object",
        properties: {
          user_id: { type: "integer" },
          username: { type: "string" },
          email: { type: "string" },
          first_name: { type: "string" },
          last_name: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          country: { type: "string" },
          account_status: { type: "string" },
          is_email_verified: { type: "boolean" },
          created_date: { type: "string", format: "date-time" },
          _count: {
            type: "object",
            properties: {
              reviews: { type: "integer" },
              favorites: { type: "integer" },
            },
          },
        },
      },
      CreateUserRequest: {
        type: "object",
        required: ["username", "email", "password_hash"],
        properties: {
          username: { type: "string", minLength: 3, maxLength: 50 },
          email: { type: "string", format: "email" },
          password_hash: { type: "string", minLength: 6 },
          first_name: { type: "string", maxLength: 100 },
          last_name: { type: "string", maxLength: 100 },
          date_of_birth: { type: "string", format: "date" },
          city: { type: "string", maxLength: 100 },
          state: { type: "string", maxLength: 100 },
          country: { type: "string", maxLength: 100 },
        },
      },
      Photo: {
        type: "object",
        properties: {
          photo_id: { type: "integer" },
          restaurant_id: { type: "integer" },
          user_id: { type: "integer" },
          review_id: { type: "integer" },
          photo_url: { type: "string" },
          caption: { type: "string" },
          file_name: { type: "string" },
          file_size: { type: "integer" },
          moderation_status: { type: "string" },
          is_active: { type: "boolean" },
          created_date: { type: "string", format: "date-time" },
        },
      },
      Stats: {
        type: "object",
        properties: {
          totalRestaurants: { type: "integer" },
          totalReviews: { type: "integer" },
          averageRating: { type: "number" },
          topCategories: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category_name: { type: "string" },
                restaurant_count: { type: "integer" },
              },
            },
          },
        },
      },
      Pagination: {
        type: "object",
        properties: {
          total: { type: "integer", description: "Total number of items" },
          limit: { type: "integer", description: "Items per page" },
          offset: { type: "integer", description: "Items skipped" },
          pages: { type: "integer", description: "Total number of pages" },
        },
      },
    },
  },
};

export async function GET() {
  try {
    return NextResponse.json(swaggerSpec);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate API documentation" },
      { status: 500 }
    );
  }
}
