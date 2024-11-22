import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Ticket } from 'lucide-react';
import { cn } from "@/lib/utils";

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
                Comedy Night
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                  Extravaganza 🎭
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 max-w-2xl mx-auto">
                Join us for an unforgettable night of laughter and entertainment! ✨
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {session ? (
                <Link
                  href="/book-tickets"
                  className={cn(
                    "group relative inline-flex items-center justify-center px-8 py-4",
                    "bg-white text-purple-700 rounded-full font-bold text-lg",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]",
                    "hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.2)]",
                    "transform transition-all duration-300 hover:-translate-y-1"
                  )}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Book Your Tickets Now
                  <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur" />
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className={cn(
                    "group relative inline-flex items-center justify-center px-8 py-4",
                    "bg-white text-purple-700 rounded-full font-bold text-lg",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]",
                    "hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.2)]",
                    "transform transition-all duration-300 hover:-translate-y-1"
                  )}
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  Sign in to Book Tickets
                  <span className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Event Details Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-purple-600 rounded-full" />
              Event Details
            </h2>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-purple-100">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-6"
              >
                <div className="p-4 bg-purple-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                  <p className="text-gray-600">Saturday, March 30, 2024</p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 7:00 PM
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-6"
              >
                <div className="p-4 bg-purple-100 rounded-xl">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Venue</h3>
                  <p className="text-gray-600">Hotel Harmony</p>
                  <p className="text-gray-600">Amreli, Gujarat</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-start space-x-6"
              >
                <div className="p-4 bg-purple-100 rounded-xl">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Capacity</h3>
                  {venueStatus.isFull ? (
                    <p className="text-red-600 font-medium">Fully Booked</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        {50 - venueStatus.totalApproved} seats remaining
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(venueStatus.totalApproved / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-purple-600 rounded-full" />
              Location
            </h2>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100"
            >
              <div className="relative pb-[75%] h-0">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.6274104772833!2d70.4557335!3d21.522309299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958018cc8f7f539%3A0x2511ba0a655c03dc!2sHotel%20Harmony!5e0!3m2!1sen!2sin!4v1732020057223!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0 hover:opacity-90 transition-opacity duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

