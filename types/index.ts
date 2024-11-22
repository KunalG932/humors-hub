/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  name?: string | null;
  image?: string | null;
  isComedian?: boolean;
  comedianProfile?: {
    bio?: string;
    speciality?: string;
    videoUrl?: string;
    phone?: string;
    status?: 'pending' | 'approved' | 'declined';
    pricePerShow?: number;
  };
  createdAt: Date | string | null;
  updatedAt: Date;
}

export interface Booking {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  numberOfTickets?: number;
  status: 'pending' | 'approved' | 'declined';
  isComedianBooking?: boolean;
  comedianProfile?: {
    comedianType: string;
    bio: string;
    speciality: string;
    videoUrl: string;
    experience: string;
  };
  createdAt: string;
  updatedAt: string;
} 