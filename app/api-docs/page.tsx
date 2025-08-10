"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "swagger-ui-react/swagger-ui.css";

// Simple static spec definition as fallback
const staticSpec = {
  openapi: "3.0.0",
  info: {
    title: "Restaurant Review API",
    version: "1.0.0",
    description: "A comprehensive restaurant review and rating system API",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  paths: {
    "/api/restaurants": {
      get: {
        tags: ["Restaurants"],
        summary: "Get all restaurants",
        description:
          "Retrieve a list of all restaurants with optional filtering",
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
        ],
        responses: {
          "200": {
            description: "List of restaurants",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Restaurant" },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Restaurants"],
        summary: "Create a new restaurant",
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
          },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          "200": {
            description: "List of categories",
          },
        },
      },
    },
    "/api/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Get all reviews",
        parameters: [
          {
            name: "restaurant_id",
            in: "query",
            description: "Filter by restaurant ID",
            required: false,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "List of reviews",
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
          restaurant_id: { type: "integer" },
          name: { type: "string" },
          description: { type: "string" },
          address: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          price_range: { type: "integer", minimum: 1, maximum: 4 },
          average_rating: { type: "number", minimum: 0, maximum: 5 },
          is_verified: { type: "boolean" },
        },
      },
      CreateRestaurantRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          address: { type: "string" },
          city: { type: "string" },
          price_range: { type: "integer" },
        },
      },
    },
  },
};

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(
  () => import("swagger-ui-react").then((mod) => mod.default),
  { ssr: false }
);

export default function SwaggerPage() {
  const [spec, setSpec] = useState(staticSpec);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Try to fetch enhanced spec from API, fallback to static spec
    setLoading(true);
    fetch("/api/swagger")
      .then((res) => res.json())
      .then((data) => {
        setSpec(data);
      })
      .catch((err) => {
        console.log("Using static spec as fallback");
        // Keep the static spec
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🍽️ Restaurant Review API Documentation
          </h1>
          <p className="text-gray-600 mb-4">
            Interactive API documentation for the Restaurant Review System. This
            API provides comprehensive functionality for managing restaurants,
            reviews, users, categories, and more.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">
              🚀 Quick Start
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>
                • Base URL:{" "}
                <code className="bg-blue-100 px-1 rounded">
                  http://localhost:3001
                </code>
              </li>
              <li>• All endpoints return JSON responses</li>
              <li>
                • Use the interactive documentation below to test API calls
              </li>
            </ul>
          </div>
          {loading && (
            <div className="text-blue-600 flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading enhanced documentation...
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <SwaggerUI
            spec={spec}
            docExpansion="list"
            deepLinking={true}
            displayRequestDuration={true}
            tryItOutEnabled={true}
            supportedSubmitMethods={["get", "post", "put", "delete", "patch"]}
          />
        </div>
      </div>
    </div>
  );
}
