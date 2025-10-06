import { createTweet, listTweetsByUser } from '../models/tweets.js';
import { ensureRedis, redis } from '../config/redis.js';


async function invalidateTimelinesForFollowers (authorId) {
await ensureRedis();
// Invalidate broad pattern (simple approach). In production, track follower IDs and delete per follower.
const pattern = `timeline:*`;
for await (const key of redis.scanIterator({ MATCH: pattern })) {
await redis.del(key);
}
}


export async function create (req, res, next) {
try {
const { content } = req.body;
if (!content || content.length === 0 || content.length > 280) {
return res.status(400).json({ error: 'Content must be 1-280 chars' });
}
const tweet = await createTweet({ userId: req.user.id, content });
// Invalidate cached timelines so fresh content appears
await invalidateTimelinesForFollowers(req.user.id);
res.status(201).json({ tweet });
} catch (err) { next(err); }
}


export async function listByUser (req, res, next) {
try {
const { limit, cursor } = req.query;
const tweets = await listTweetsByUser(req.params.userId, {
limit: Math.min(Number(limit) || 20, 100),
cursor
});
res.json({ tweets, nextCursor: tweets.at(-1)?.created_at ? (new Date(tweets.at(-1).created_at).getTime() / 1000) : null });
} catch (err) { next(err); }
}
