import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables if they haven't been loaded
dotenv.config();

const router = Router();

router.get('/reels', async (req: Request, res: Response) => {
  const accessToken = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (!accessToken || !userId) {
    return res.status(500).json({ error: 'Instagram API credentials missing' });
  }

  // Fetching latest 6 Reels (media_type=VIDEO or REEL)
  const url = `https://graph.instagram.com/v19.0/${userId}/media?fields=id,caption,media_url,thumbnail_url,media_type,timestamp,like_count&limit=6&media_type=REEL&access_token=${accessToken}`;

  try {
    const response = await fetch(url, {
      // Note: Node's native fetch doesn't support the 'next: { revalidate }' option
      // which is specific to Next.js. We rely on the client or an actual cache mechanism here if needed.
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API');
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Instagram API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch reels' });
  }
});

export default router;
