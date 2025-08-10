import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Memos Tonight - Find Your Next Meal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">
          {/* Hero Section with Background Image */}
          <div
            className="relative rounded-3xl overflow-hidden mb-12"
            style={{
              backgroundColor: "#FF7777",
            }}
          >
            <div className="relative z-10 px-6 py-24 text-center">
              <h1 className="text-6xl font-bold mb-6 text-white">
                Discover Local Flavors
              </h1>
              <p className="text-xl mb-12 text-white/90">
                Find and book the best restaurants in your neighborhood
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-3 rounded-2xl">
                <div className="flex gap-4">
                  <div className="flex-1 flex items-center bg-white rounded-xl px-4 shadow-lg">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-800"
                      placeholder="Search by cuisine, restaurant, or location..."
                    />
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg">
                    Search Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Featured Restaurants
            </h2>
            <Link
              href="/all"
              className="group flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              View all
              <span className="ml-1 group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Mario's Pizzeria",
                rating: "4.2",
                reviews: 127,
                image:
                  "https://images.unsplash.com/photo-1513104890138-7c749659a591",
                desc: "Italian • $$ • 0.5 miles",
              },
              {
                id: 2,
                name: "Tokyo Sushi Bar",
                rating: "4.7",
                reviews: 89,
                image:
                  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
                desc: "Japanese • $$$ • 1.2 miles",
              },
              {
                id: 3,
                name: "The Garden Cafe",
                rating: "4.0",
                reviews: 203,
                image:
                  "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf",
                desc: "Vegetarian • $ • 0.8 miles",
              },
            ].map((restaurant) => (
              <Link
                href={`/restaurant/${restaurant.id}`}
                key={restaurant.id}
                className="group block rounded-xl overflow-hidden bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {restaurant.rating} ★
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {restaurant.desc}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {restaurant.reviews} reviews
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
