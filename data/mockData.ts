import { Restaurant, Review } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Mario's Pizzeria",
    rating: 4.2,
    reviewCount: 127,
    cuisine: "Italian",
    priceRange: "$$",
    distance: "0.5 miles",
    address: "123 Main Street",
    phone: "(555) 123-4567",
    hours: "11:00 AM - 10:00 PM",
    description: "Authentic Italian pizzeria serving wood-fired pizzas and homemade pasta.",
    imageUrl: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f"
  },
  // Add more restaurants...
];

export const reviews: Review[] = [
  {
    id: 1,
    restaurantId: 1,
    userName: "Sarah Johnson",
    rating: 5,
    date: "2024-02-10",
    title: "Best Pizza in Town!",
    text: "Amazing pizza! The crust was perfectly crispy and the toppings were fresh. Great atmosphere and friendly staff.",
    helpful: 12,
    photos: ["pizza1.jpg", "pizza2.jpg"]
  },
  // Add more reviews...
];
