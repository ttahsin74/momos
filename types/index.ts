// Database Models Types
export interface Category {
  category_id: number;
  category_name: string;
  category_description?: string;
  is_active: boolean;
  created_date: Date;
}

export interface Restaurant {
  restaurant_id: number;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  website?: string;
  hours_operation?: Record<string, string>;
  price_range?: number; // 1-4 ($-$$$$)
  average_rating?: number;
  total_reviews?: number;
  latitude?: number;
  longitude?: number;
  is_verified: boolean;
  created_date: Date;
  updated_date?: Date;
  is_active: boolean;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  is_verified: boolean;
  created_date: Date;
  last_login?: Date;
  is_active: boolean;
}

export interface Review {
  review_id: number;
  user_id: number;
  restaurant_id: number;
  rating: number; // 1-5
  review_title?: string;
  review_text?: string;
  is_recommended?: boolean;
  moderation_status?: "pending" | "approved" | "rejected";
  created_date: Date;
  updated_date?: Date;
  is_active: boolean;
}

// API Request Types
export interface CreateRestaurantRequest {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  website?: string;
  hours_operation?: Record<string, string>;
  price_range?: number;
  latitude?: number;
  longitude?: number;
  category_ids?: number[];
}

export interface CreateReviewRequest {
  restaurant_id: number;
  rating: number;
  review_title?: string;
  review_text?: string;
  is_recommended?: boolean;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface SearchFilters {
  search?: string;
  city?: string;
  state?: string;
  category_id?: number;
  price_range?: number;
  min_rating?: number;
  is_verified?: boolean;
}
