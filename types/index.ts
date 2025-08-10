export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  distance: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

export interface Review {
  id: number;
  restaurantId: number;
  userName: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
  photos?: string[];
  createdAt?: string;
  updatedAt?: string;
  restaurant?: {
    name: string;
    imageUrl: string;
  };
}

export interface CreateReviewRequest {
  restaurantId: number;
  userName: string;
  rating: number;
  title: string;
  text: string;
  photos?: string[];
}

export interface CreateRestaurantRequest {
  name: string;
  cuisine: string;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  distance: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  imageUrl: string;
  rating?: number;
}

export interface AppStats {
  totalRestaurants: number;
  totalReviews: number;
  averageRating: number;
  topCuisines: {
    cuisine: string;
    count: number;
  }[];
}
