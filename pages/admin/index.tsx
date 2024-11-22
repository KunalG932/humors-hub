/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  role: string;
}

interface Booking {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'declined';
  numberOfTickets?: number;
  createdAt: string;
}

interface ComedianProfile {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  comedianProfile: {
    comedianType: string;
    speciality: string;
    experience: string;
    bio: string;
    videoUrl: string;
    status: 'pending' | 'approved' | 'declined';
  };
}

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookings' | 'users' | 'comedians'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comedians, setComedians] = useState<ComedianProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    if (!session?.user?.email || session.user.email !== 'admin@humorshub.com') {
      router.push('/');
      return;
    }
    fetchData();
  }, [session, status, router, activeTab]);

  useEffect(() => {
    if (activeTab === 'comedians') {
      fetchComedians();
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'bookings') {
        await fetchBookings();
      } else if (activeTab === 'users') {
        await fetchUsers();
      } else if (activeTab === 'comedians') {
        await fetchComedians();
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    const res = await fetch('/api/admin/bookings');
    if (!res.ok) throw new Error('Failed to fetch bookings');
    const data = await res.json();
    setBookings(data.bookings);
  };

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    if (!res.ok) throw new Error('Failed to fetch users');
    const data = await res.json();
    setUsers(data.users);
  };

  const fetchComedians = async () => {
    try {
      const res = await fetch('/api/admin/comedians');
      if (!res.ok) throw new Error('Failed to fetch comedians');
      const data = await res.json();
      setComedians(data.comedians);
    } catch (err) {
      console.error('Fetch comedians error:', err);
      setError('Failed to load comedians');
    }
  };

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      toast.success('Booking status updated successfully');
      fetchBookings();
    } catch (err) {
      console.error('Update status error:', err);
      toast.error('Failed to update booking status');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete user');
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      console.error('Delete user error:', err);
      toast.error('Failed to delete user');
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error('Failed to update user role');
      toast.success('User role updated successfully');
      fetchUsers();
    } catch (err) {
      console.error('Update role error:', err);
      toast.error('Failed to update user role');
    }
  };

  const handleComedianStatusUpdate = async (userId: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/comedians/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update comedian status');
      }

      toast.success('Comedian status updated successfully');
      await fetchComedians();
    } catch (err) {
      console.error('Update comedian status error:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update comedian status');
      setError('Failed to update comedian status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('comedians')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeTab === 'comedians'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Comedians
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {activeTab === 'bookings' ? (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Requests</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Email
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Phone
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Date
                      </th>
                      <th className="px-3 py-2 sm:px-6 sm:py-3 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm">
                          {booking.fullName}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                          {booking.email}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                          {booking.phone}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${booking.status === 'approved' ? 'bg-green-100 text-green-800' :
                              booking.status === 'declined' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleStatusUpdate(booking._id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(booking._id, 'declined')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                          >
                            <option value="user">User</option>
                            <option value="admin">Buddy</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4">Comedian Applications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {comedians.map((comedian) => (
                  <div key={comedian._id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium">{comedian.username}</h3>
                        <p className="text-sm text-gray-500">{comedian.email}</p>
                        <p className="text-sm text-gray-500">Phone: {comedian.phone}</p>
                        <p className="text-sm text-gray-500">
                          Applied: {new Date(comedian.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${comedian.comedianProfile.status === 'approved' ? 'bg-green-100 text-green-800' :
                            comedian.comedianProfile.status === 'declined' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                          {comedian.comedianProfile.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Type</h4>
                        <p className="text-sm">{comedian.comedianProfile.comedianType}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Speciality</h4>
                        <p className="text-sm">{comedian.comedianProfile.speciality}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700">Bio</h4>
                      <p className="text-sm mt-1 line-clamp-3">{comedian.comedianProfile.bio}</p>
                    </div>

                    {comedian.comedianProfile.status === 'pending' && (
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <button
                          onClick={() => handleComedianStatusUpdate(comedian._id, 'approved')}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleComedianStatusUpdate(comedian._id, 'declined')}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 