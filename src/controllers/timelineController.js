import { query } from '../config/db.js';
import { ensureRedis, redis } from '../config/redis.js';


// Return tweets from users you follow + yourself, newest first, with like counts
export async function getTimeline (req, res, next) {
try {
const userId = req.user.id;
const limit = Math.min(Number(req.query.limit) || 50, 200);


await ensureRedis();
const cacheKey = `timeline:${userId}:limit:${limit}`;
const cached = await redis.get(cacheKey);
if (cached) {
return res.json({ source: 'cache', items: JSON.parse(cached) });
}


const { rows } = await query(
`WITH followees AS (
SELECT followee_id FROM follows WHERE follower_id = $1
)
SELECT t.id, t.user_id, u.username, t.content, t.created_at,
COALESCE(l.count, 0) AS likes
FROM tweets t
JOIN users u ON u.id = t.user_id
LEFT JOIN (
SELECT tweet_id, COUNT(*)::int AS count
FROM likes
GROUP BY tweet_id
) l ON l.tweet_id = t.id
WHERE t.user_id = $1 OR t.user_id IN (SELECT followee_id FROM followees)
ORDER BY t.created_at DESC
LIMIT $2`,
[userId, limit]
);


// Cache for 60 seconds (tune as needed)
await redis.set(cacheKey, JSON.stringify(rows), { EX: 60 });
res.json({ source: 'db', items: rows });
} catch (err) { next(err); }
}
