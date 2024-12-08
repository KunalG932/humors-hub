import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfile {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  role: string;
  createdAt: string;
  isComedian?: boolean;
  comedianProfile?: {
    comedianType: string;
    speciality: string;
    experience: string;
    bio: string;
    status: 'pending' | 'approved' | 'declined';
  };
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState({
    username: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/signin');
      return;
    }
    fetchProfile();
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/users/profile?email=${session?.user?.email}`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      const data = await res.json();
      setProfile(data.user);
      setEditForm({
        username: data.user.username,
        phone: data.user.phone || '',
        bio: data.user.bio || ''
      });
    } catch (err) {
      console.error('Fetch profile error:', err);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          ...editForm
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error('Update profile error:', err);
      toast.error('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 border-t-4 border-purple-500 rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-6">
              <h1 className="text-3xl font-bold text-white">Your Profile</h1>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.form
                    key="edit-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleUpdateProfile}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={editForm.username}
                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bio</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <FiX className="mr-2" /> Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        <FiSave className="mr-2" /> Save Changes
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="profile-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{profile?.username}</h2>
                        <p className="text-sm text-gray-500">Member since {new Date(profile?.createdAt || '').toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                      >
                        <FiEdit2 className="mr-2" /> Edit Profile
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                          <dl className="mt-2 space-y-2">
                            <div className="flex items-center">
                              <dt className="sr-only">Email</dt>
                              <dd className="flex items-center text-sm text-gray-700">
                                <FiMail className="mr-2 text-gray-400" />
                                {profile?.email}
                              </dd>
                            </div>
                            {profile?.phone && (
                              <div className="flex items-center">
                                <dt className="sr-only">Phone</dt>
                                <dd className="flex items-center text-sm text-gray-700">
                                  <FiPhone className="mr-2 text-gray-400" />
                                  {profile.phone}
                                </dd>
                              </div>
                            )}
                          </dl>
                        </div>
                        {profile?.bio && (
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                            <p className="mt-2 text-sm text-gray-700">{profile.bio}</p>
                          </div>
                        )}
                      </div>

                      {profile?.isComedian && profile.comedianProfile && (
                        <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg p-6 shadow-inner">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Comedian Profile</h3>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Type</dt>
                              <dd className="mt-1 text-sm text-gray-900">{profile.comedianProfile.comedianType}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Speciality</dt>
                              <dd className="mt-1 text-sm text-gray-900">{profile.comedianProfile.speciality}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Experience</dt>
                              <dd className="mt-1 text-sm text-gray-900">{profile.comedianProfile.experience}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Status</dt>
                              <dd className="mt-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${profile.comedianProfile.status === 'approved' ? 'bg-green-100 text-green-800' :
                                    profile.comedianProfile.status === 'declined' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'}`}>
                                  {profile.comedianProfile.status}
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

