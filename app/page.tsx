import Head from 'next/head';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Memos Tonight - UI Mockups</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-400 text-white p-8 text-center rounded-lg mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Dining Experience</h1>
            <p className="text-xl mb-6">Discover the best restaurants in your area</p>
            <input
              type="text"
              className="w-full max-w-2xl px-6 py-4 rounded-full text-gray-800 shadow-lg"
              placeholder="Search restaurants, cuisine, or location..."
            />
          </div>

          <h2 className="text-2xl font-bold mb-6">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: 1, name: "Mario's Pizzeria", rating: "★★★★☆ 4.2 (127 reviews)", desc: "Italian • $$ • 0.5 miles" },
              { id: 2, name: "Tokyo Sushi Bar", rating: "★★★★★ 4.7 (89 reviews)", desc: "Japanese • $$$ • 1.2 miles" },
              { id: 3, name: "The Garden Cafe", rating: "★★★★☆ 4.0 (203 reviews)", desc: "Vegetarian • $ • 0.8 miles" },
              { id: 4, name: "Steakhouse Prime", rating: "★★★★☆ 4.4 (156 reviews)", desc: "American • $$$$ • 2.1 miles" },
            ].map((restaurant) => (
              <Link 
                href={`/restaurant/${restaurant.id}`} 
                key={restaurant.id}
                className="block border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
                <div className="text-amber-500">{restaurant.rating}</div>
                <p className="text-gray-600 mt-2">{restaurant.desc}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}