"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Restaurant, Review, AppStats } from "@/types";

export default function ApiTestPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<AppStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [restaurantsData, reviewsData, statsData] = await Promise.all([
        api.restaurants.getAll(),
        api.reviews.getAll(),
        api.stats.get(),
      ]);

      setRestaurants(restaurantsData);
      setReviews(reviewsData);
      setStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkHelpful = async (reviewId: number) => {
    try {
      await api.reviews.markHelpful(reviewId);
      // Reload reviews to see updated helpful count
      const updatedReviews = await api.reviews.getAll();
      setReviews(updatedReviews);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to mark as helpful"
      );
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>

      {/* Stats Section */}
      {stats && (
        <div className="mb-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalRestaurants}
              </div>
              <div className="text-sm text-gray-600">Total Restaurants</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {stats.totalReviews}
              </div>
              <div className="text-sm text-gray-600">Total Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.averageRating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-medium mb-2">Top Cuisines:</h3>
            <div className="flex gap-2">
              {stats.topCuisines.map((cuisine, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {cuisine.cuisine} ({cuisine.count})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Restaurants Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Restaurants ({restaurants.length})
        </h2>
        <div className="grid gap-4">
          {restaurants.slice(0, 3).map((restaurant) => (
            <div key={restaurant.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{restaurant.name}</h3>
                  <p className="text-gray-600">
                    {restaurant.cuisine} • {restaurant.priceRange}
                  </p>
                  <p className="text-sm text-gray-500">{restaurant.address}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-600">
                    ★ {restaurant.rating}
                  </div>
                  <div className="text-sm text-gray-500">
                    {restaurant.reviewCount} reviews
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                {restaurant.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Recent Reviews ({reviews.length})
        </h2>
        <div className="grid gap-4">
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{review.title}</h4>
                  <p className="text-sm text-gray-600">by {review.userName}</p>
                </div>
                <div className="text-right">
                  <div className="text-yellow-600">
                    {"★".repeat(review.rating)}
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{review.text}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {review.restaurant?.name}
                </span>
                <button
                  onClick={() => handleMarkHelpful(review.id)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
