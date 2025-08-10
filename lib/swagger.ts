import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Review API",
      version: "1.0.0",
      description: "A comprehensive restaurant review and rating system API",
      contact: {
        name: "API Support",
        email: "support@restaurantreview.com",
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            category_id: {
              type: "integer",
              description: "Unique identifier for the category",
            },
            category_name: {
              type: "string",
              description: "Name of the category",
            },
            category_description: {
              type: "string",
              nullable: true,
              description: "Description of the category",
            },
            is_active: {
              type: "boolean",
              default: true,
              description: "Whether the category is active",
            },
            created_date: {
              type: "string",
              format: "date-time",
              description: "When the category was created",
            },
          },
        },
        Restaurant: {
          type: "object",
          properties: {
            restaurant_id: {
              type: "integer",
              description: "Unique identifier for the restaurant",
            },
            name: {
              type: "string",
              description: "Restaurant name",
            },
            description: {
              type: "string",
              nullable: true,
              description: "Restaurant description",
            },
            address: {
              type: "string",
              nullable: true,
              description: "Street address",
            },
            city: {
              type: "string",
              nullable: true,
              description: "City",
            },
            state: {
              type: "string",
              nullable: true,
              description: "State or province",
            },
            zip_code: {
              type: "string",
              nullable: true,
              description: "ZIP or postal code",
            },
            website: {
              type: "string",
              nullable: true,
              description: "Restaurant website URL",
            },
            hours_operation: {
              type: "object",
              nullable: true,
              description: "Operating hours for each day",
            },
            price_range: {
              type: "integer",
              nullable: true,
              minimum: 1,
              maximum: 4,
              description: "Price range (1=$ to 4=$$$$)",
            },
            average_rating: {
              type: "number",
              nullable: true,
              minimum: 0,
              maximum: 5,
              description: "Average rating out of 5",
            },
            total_reviews: {
              type: "integer",
              nullable: true,
              description: "Total number of reviews",
            },
            latitude: {
              type: "number",
              nullable: true,
              description: "Latitude coordinate",
            },
            longitude: {
              type: "number",
              nullable: true,
              description: "Longitude coordinate",
            },
            is_verified: {
              type: "boolean",
              default: false,
              description: "Whether the restaurant is verified",
            },
            created_date: {
              type: "string",
              format: "date-time",
              description: "When the restaurant was created",
            },
            updated_date: {
              type: "string",
              format: "date-time",
              nullable: true,
              description: "When the restaurant was last updated",
            },
            is_active: {
              type: "boolean",
              default: true,
              description: "Whether the restaurant is active",
            },
          },
        },
        User: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "Unique identifier for the user",
            },
            username: {
              type: "string",
              description: "Username",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address",
            },
            first_name: {
              type: "string",
              nullable: true,
              description: "First name",
            },
            last_name: {
              type: "string",
              nullable: true,
              description: "Last name",
            },
            phone: {
              type: "string",
              nullable: true,
              description: "Phone number",
            },
            is_verified: {
              type: "boolean",
              default: false,
              description: "Whether the user is verified",
            },
            created_date: {
              type: "string",
              format: "date-time",
              description: "When the user was created",
            },
            last_login: {
              type: "string",
              format: "date-time",
              nullable: true,
              description: "Last login timestamp",
            },
            is_active: {
              type: "boolean",
              default: true,
              description: "Whether the user is active",
            },
          },
        },
        Review: {
          type: "object",
          properties: {
            review_id: {
              type: "integer",
              description: "Unique identifier for the review",
            },
            user_id: {
              type: "integer",
              description: "ID of the user who wrote the review",
            },
            restaurant_id: {
              type: "integer",
              description: "ID of the restaurant being reviewed",
            },
            rating: {
              type: "integer",
              minimum: 1,
              maximum: 5,
              description: "Rating out of 5",
            },
            review_title: {
              type: "string",
              nullable: true,
              description: "Title of the review",
            },
            review_text: {
              type: "string",
              nullable: true,
              description: "Review content",
            },
            is_recommended: {
              type: "boolean",
              nullable: true,
              description: "Whether the user recommends the restaurant",
            },
            moderation_status: {
              type: "string",
              nullable: true,
              enum: ["pending", "approved", "rejected"],
              description: "Moderation status of the review",
            },
            created_date: {
              type: "string",
              format: "date-time",
              description: "When the review was created",
            },
            updated_date: {
              type: "string",
              format: "date-time",
              nullable: true,
              description: "When the review was last updated",
            },
            is_active: {
              type: "boolean",
              default: true,
              description: "Whether the review is active",
            },
          },
        },
        Photo: {
          type: "object",
          properties: {
            photo_id: {
              type: "integer",
              description: "Unique identifier for the photo",
            },
            user_id: {
              type: "integer",
              description: "ID of the user who uploaded the photo",
            },
            restaurant_id: {
              type: "integer",
              description: "ID of the restaurant",
            },
            review_id: {
              type: "integer",
              nullable: true,
              description: "ID of the associated review (if any)",
            },
            photo_url: {
              type: "string",
              description: "URL of the photo",
            },
            caption: {
              type: "string",
              nullable: true,
              description: "Photo caption",
            },
            file_name: {
              type: "string",
              nullable: true,
              description: "Original file name",
            },
            file_size: {
              type: "integer",
              nullable: true,
              description: "File size in bytes",
            },
            moderation_status: {
              type: "string",
              nullable: true,
              enum: ["pending", "approved", "rejected"],
              description: "Moderation status of the photo",
            },
            created_date: {
              type: "string",
              format: "date-time",
              description: "When the photo was uploaded",
            },
            is_active: {
              type: "boolean",
              default: true,
              description: "Whether the photo is active",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Error message",
            },
            code: {
              type: "string",
              description: "Error code",
            },
          },
        },
      },
    },
  },
  apis: ["./app/api/**/*.ts"], // Path to the API files
};

export default swaggerOptions;
