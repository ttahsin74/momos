import Image from 'next/image';
import Link from 'next/link';
import { Restaurant } from '@/types';

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Link 
      href={`/restaurant/${restaurant.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
        <div className="flex items-center gap-1 text-amber-500">
          {'★'.repeat(Math.floor(restaurant.rating))}
          <span className="text-gray-600 text-sm ml-1">
            ({restaurant.reviewCount} reviews)
          </span>
        </div>
        <p className="text-gray-600 mt-2">
          {restaurant.cuisine} • {restaurant.priceRange} • {restaurant.distance}
        </p>
      </div>
    </Link>
  );
}
