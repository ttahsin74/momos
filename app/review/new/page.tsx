'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function WriteReview() {
  const [rating, setRating] = useState(4);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <Link href="/" className="text-red-500 font-bold text-lg">Memos Tonight</Link>
        <div className="flex gap-5">
          <Link href="/restaurant/1" className="text-white hover:underline">← Back</Link>
          <Link href="/profile" className="text-white hover:underline">Profile</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-6">Write a Review for Mario's Pizzeria</h1>
          <form>
            {/* ...existing form code... */}
          </form>
        </div>
      </main>
    </div>
  );
}
