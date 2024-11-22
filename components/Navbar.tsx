/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <span className="text-2xl">🎭</span>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Humors Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-between md:flex-1 md:ml-10">
            <div className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/book-tickets"
                className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Book Tickets
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <div className="flex items-center space-x-4">
                    {session.user?.email === 'admin@humorshub.com' && (
                      <Link
                        href="/admin"
                        className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <span>👤</span>
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/book-tickets"
                className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Tickets
              </Link>
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  {session.user?.email === 'admin@humorshub.com' && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <div className="pt-4 mt-2 border-t border-gray-100">
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 mt-2 border-t border-gray-100 space-y-1">
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-4 py-2 text-base font-medium bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 
