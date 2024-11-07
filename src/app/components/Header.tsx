// src/app/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-2xl font-bold">Carhalla</h1>
      <nav className="flex gap-4">
        <Link href="/login">
          <button className="px-5 py-2 text-sm font-semibold text-gray-100 bg-blue-500 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-5 py-2 text-sm font-semibold text-gray-100 bg-green-500 rounded-full hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Sign Up
          </button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
