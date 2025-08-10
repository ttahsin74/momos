'use client'
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function RestaurantDetails({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-lg mb-5">
          <h1 className="text-2xl mb-3">Mario's Pizzeria</h1>
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <div className="text-yellow-500 text-sm">★★★★☆ 4.2 (127 reviews)</div>
              <p>Italian • $$ • Open until 10 PM</p>
            </div>
            <div>
              <p>📍 123 Main Street</p>
              <p>📞 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="flex border-b-2 border-gray-200 mb-5">
          {["Reviews", "Photos", "Info", "Menu"].map((tab, index) => (
            <div key={index} className={`p-3 cursor-pointer ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
              {tab}
            </div>
          ))}
        </div>

        <Link 
          href={`/review/new?restaurantId=${params.id}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg mb-5 hover:bg-blue-700"
        >
          Write a Review
        </Link>

        {/* Reviews section */}
        <div className="space-y-4">
          {/* ... existing review items code ... */}
        </div>
      </main>
    </div>
  );
}