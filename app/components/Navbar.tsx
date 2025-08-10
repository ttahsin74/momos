'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Browse', path: '/browse' },
    { title: 'Profile', path: '/profile' },
    { title: 'Login', path: '/login' }
  ];

  return (
    <nav className="bg-gray-800 px-4 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-red-500 font-bold text-2xl hover:text-red-400 transition-colors">
          Memos Tonight
        </Link>
        <div className="flex gap-8">
          {navItems.map(({ title, path }) => (
            <Link
              key={path}
              href={path}
              className={`text-white hover:text-red-400 transition-colors text-lg
                ${pathname === path ? 'text-red-400 font-semibold' : ''}`}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}