"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, Ticket, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Home() {
  const { data: session } = useSession()
  const [venueStatus, setVenueStatus] = useState<{
    totalApproved: number
    isFull: boolean
  }>({ totalApproved: 0, isFull: false })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const fetchVenueStatus = async () => {
      try {
        const res = await fetch('/api/bookings/venue-status')
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        setVenueStatus(data)
      } catch (err) {
        console.error('Failed to fetch venue status:', err)
      }
    }

    fetchVenueStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-purple-100 to-white">
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Comedy Night
              </span>
              <span className="block text-white mt-2">
                Extravaganza 🎭
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl md:text-2xl text-purple-200">
              Get ready for an evening filled with non-stop laughter, unforgettable moments, and pure entertainment! ✨
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {session ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-purple-50 hover:scale-105 transform transition-all duration-300"
                >
                  <Link href="/book-tickets">
                    Book Your Tickets Now 🎟️
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-purple-50 hover:scale-105 transform transition-all duration-300"
                >
                  <Link href="/auth/login">
                    Sign in to Book Tickets 🎫
                  </Link>
                </Button>
              )}
              
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link href="#details">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 bg-white rounded-full"
              initial={{
                opacity: Math.random() * 0.5 + 0.3,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * -500],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Event Details Section */}
      <section id="details" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900">Event Details ℹ️</h2>
            <p className="mt-4 text-xl text-gray-600">Everything you need to know about the biggest comedy night of the year</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <TooltipProvider>
                {[
                  {
                    icon: Calendar,
                    title: "Date",
                    info: "Saturday, March 30, 2024",
                    tooltip: "Mark your calendar!"
                  },
                  {
                    icon: Clock,
                    title: "Time",
                    info: "7:00 PM",
                    tooltip: "Doors open at 6:30 PM"
                  },
                  {
                    icon: MapPin,
                    title: "Venue",
                    info: "Hotel Harmony, Amreli",
                    tooltip: "Easy parking available"
                  },
                  {
                    icon: Users,
                    title: "Capacity",
                    info: venueStatus.isFull 
                      ? "Fully Booked" 
                      : `${50 - venueStatus.totalApproved} seats remaining`,
                    tooltip: "Book early to avoid disappointment"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-purple-100 rounded-full">
                                <item.icon className="size-6 text-purple-600" />
                              </div>
                              <div className="text-left">
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                <p className={`text-lg ${item.title === 'Capacity' && venueStatus.isFull ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
                                  {item.info}
                                </p>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TooltipProvider>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="overflow-hidden h-full">
                <CardContent className="p-0">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.6274104772833!2d70.4557335!3d21.522309299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958018cc8f7f539%3A0x2511ba0a655c03dc!2sHotel%20Harmony!5e0!3m2!1sen!2sin!4v1732020057223!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "500px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="hover:opacity-90 transition-opacity duration-300"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900">What to Expect 🎉</h2>
            <p className="mt-4 text-xl text-gray-600">An evening packed with entertainment and surprises</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Top Comedians",
                description: "Featuring the best comedy talent from across the country"
              },
              {
                icon: Ticket,
                title: "VIP Experience",
                description: "Premium seating with complimentary refreshments"
              },
              {
                icon: Users,
                title: "Meet & Greet",
                description: "Exclusive opportunity to meet the performers"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="size-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

