'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Browse() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">
          Restaurants near "Downtown"
        </h1>
        <p className="text-gray-600 mb-6">Found 23 restaurants</p>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {/* ... existing filters code ... */}
        </div>

        <div className="space-y-4">
          {[/* restaurant data */].map((restaurant) => (
            <Link
              href={`/restaurant/${restaurant.id}`}
              key={restaurant.id}
              className="block border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
            >
              {/* ...restaurant card content... */}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
