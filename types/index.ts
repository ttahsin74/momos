export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  distance: string;
  address: string;
  phone: string;
  hours: string;
  description: string;
  imageUrl: string;
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
}
