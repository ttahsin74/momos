'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Browse() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Browse Memories</h1>
        
        <div className="flex gap-4 mb-8">
          <input
            type="search"
            placeholder="Search memories..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Memory Title</h3>
                <p className="text-sm text-gray-600">Created by User</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
