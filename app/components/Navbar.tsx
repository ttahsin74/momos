'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 px-4 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-red-500 font-bold text-xl hover:text-red-400">
          Memos Tonight
        </Link>
        <div className="flex gap-6">
          <Link 
            href="/" 
            className={`text-white hover:text-red-400 ${pathname === '/' ? 'text-red-400' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/browse" 
            className={`text-white hover:text-red-400 ${pathname === '/browse' ? 'text-red-400' : ''}`}
          >
            Browse
          </Link>
          <Link 
            href="/profile" 
            className={`text-white hover:text-red-400 ${pathname === '/profile' ? 'text-red-400' : ''}`}
          >
            Profile
          </Link>
          <Link 
            href="/login" 
            className={`text-white hover:text-red-400 ${pathname === '/login' ? 'text-red-400' : ''}`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
