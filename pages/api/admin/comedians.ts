/**
 * @copyright (c) 2024 - Present
 * @author github.com/KunalG932
 * @license MIT
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email || session.user.email !== 'admin@humorshub.com') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const client = await clientPromise;
    const db = client.db();

    if (req.method === 'GET') {
      const comedians = await db.collection('users')
        .find({
          isComedian: true,
          comedianProfile: { $exists: true }
        })
        .sort({ createdAt: -1 })
        .toArray();

      return res.status(200).json({ comedians });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Admin comedians API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 