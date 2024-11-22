/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Booking } from '@/types';

export default function Dashboard() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0
  });

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to cancel booking');
      }

      setBookings(prev => prev.filter(booking => booking._id !== bookingId));
      
      setStats(prev => ({
        total: prev.total - 1,
        pending: prev.pending - 1,
        approved: prev.approved
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    }
  };

  useEffect(() => {
    async function fetchBookings() {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/bookings/user?email=${session.user.email}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch bookings');
        }

        setBookings(data.bookings);
        
        // Calculate stats
        const stats = data.bookings.reduce((acc: any, booking: Booking) => {
          acc.total++;
          if (booking.status === 'approved') acc.approved++;
          if (booking.status === 'pending') acc.pending++;
          return acc;
        }, { total: 0, approved: 0, pending: 0 });
        
        setStats(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookings();
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Welcome, {session?.user?.name || 'Guest'}!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-purple-800 text-lg font-semibold">Total Bookings</h2>
              <p className="text-4xl font-bold text-purple-600">{stats.total}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-green-800 text-lg font-semibold">Approved Bookings</h2>
              <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h2 className="text-yellow-800 text-lg font-semibold">Pending Bookings</h2>
              <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Bookings</h2>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.isComedianBooking ? 'Comedian Registration' : 'Show Tickets'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.isComedianBooking ? (
                          <span>Comedy Type: {booking.comedianProfile?.comedianType}</span>
                        ) : (
                          <span>{booking.numberOfTickets} ticket(s)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${booking.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'declined' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-center py-8">
                No bookings found. <Link href="/book-tickets" className="text-blue-600 hover:text-blue-500">Book now!</Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 