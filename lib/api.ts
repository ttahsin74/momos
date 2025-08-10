import {
  Restaurant,
  Review,
  CreateRestaurantRequest,
  CreateReviewRequest,
  AppStats,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Generic API fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "API request failed");
  }

  return response.json();
}

// Restaurant API functions
export const restaurantApi = {
  // Get all restaurants with optional filters
  getAll: (params?: {
    search?: string;
    cuisine?: string;
    priceRange?: string;
  }): Promise<Restaurant[]> => {
    const searchParams = new URLSearchParams();
    if (params?.search) searchParams.append("search", params.search);
    if (params?.cuisine) searchParams.append("cuisine", params.cuisine);
    if (params?.priceRange)
      searchParams.append("priceRange", params.priceRange);

    const query = searchParams.toString();
    return apiFetch(`/restaurants${query ? `?${query}` : ""}`);
  },

  // Get restaurant by ID
  getById: (id: number): Promise<Restaurant> => {
    return apiFetch(`/restaurants/${id}`);
  },

  // Create new restaurant
  create: (data: CreateRestaurantRequest): Promise<Restaurant> => {
    return apiFetch(`/restaurants`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update restaurant
  update: (id: number, data: Partial<Restaurant>): Promise<Restaurant> => {
    return apiFetch(`/restaurants/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete restaurant
  delete: (id: number): Promise<{ message: string }> => {
    return apiFetch(`/restaurants/${id}`, {
      method: "DELETE",
    });
  },
};

// Review API functions
export const reviewApi = {
  // Get all reviews with optional restaurant filter
  getAll: (restaurantId?: number): Promise<Review[]> => {
    const query = restaurantId ? `?restaurantId=${restaurantId}` : "";
    return apiFetch(`/reviews${query}`);
  },

  // Get review by ID
  getById: (id: number): Promise<Review> => {
    return apiFetch(`/reviews/${id}`);
  },

  // Create new review
  create: (data: CreateReviewRequest): Promise<Review> => {
    return apiFetch(`/reviews`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Update review
  update: (id: number, data: Partial<Review>): Promise<Review> => {
    return apiFetch(`/reviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Delete review
  delete: (id: number): Promise<{ message: string }> => {
    return apiFetch(`/reviews/${id}`, {
      method: "DELETE",
    });
  },

  // Mark review as helpful
  markHelpful: (id: number): Promise<{ helpful: number }> => {
    return apiFetch(`/reviews/${id}/helpful`, {
      method: "PATCH",
    });
  },
};

// Stats API functions
export const statsApi = {
  // Get application statistics
  get: (): Promise<AppStats> => {
    return apiFetch(`/stats`);
  },
};

// Export all APIs
export const api = {
  restaurants: restaurantApi,
  reviews: reviewApi,
  stats: statsApi,
};
