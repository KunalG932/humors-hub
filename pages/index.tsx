
/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const { data: session } = useSession();
  const [venueStatus, setVenueStatus] = useState<{
    totalApproved: number;
    isFull: boolean;
  }>({ totalApproved: 0, isFull: false });

  useEffect(() => {
    const fetchVenueStatus = async () => {
      try {
        const res = await fetch('/api/bookings/venue-status');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setVenueStatus(data);
      } catch (err) {
        console.error('Failed to fetch venue status:', err);
      }
    };

    fetchVenueStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
            >
              Comedy Night Extravaganza 🎭
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-purple-100"
            >
              Join us for an unforgettable night of laughter! ✨
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {session ? (
                <Link
                  href="/book-tickets"
                  className="inline-block bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Your Tickets Now 🎟️
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="inline-block bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign in to Book Tickets 🎫
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Event Details Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Details ℹ️</h2>
            <div className="bg-white rounded-lg shadow-xl p-6 space-y-6 hover:shadow-2xl transition-shadow duration-300">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Date & Time 📅</h3>
                  <p className="text-gray-600">Saturday, March 30, 2024 at 7:00 PM</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Venue 📍</h3>
                  <p className="text-gray-600">Hotel Harmony, Amreli</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4"
              >
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Capacity 🎫</h3>
                  <p className="text-gray-600">
                    {venueStatus.isFull ? (
                      <span className="text-red-600">Fully Booked</span>
                    ) : (
                      <span>{50 - venueStatus.totalApproved} seats remaining</span>
                    )}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Location 📍</h2>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.6274104772833!2d70.4557335!3d21.522309299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958018cc8f7f539%3A0x2511ba0a655c03dc!2sHotel%20Harmony!5e0!3m2!1sen!2sin!4v1732020057223!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="hover:opacity-90 transition-opacity duration-300"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
} 
