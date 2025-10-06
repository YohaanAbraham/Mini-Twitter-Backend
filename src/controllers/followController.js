import { follow, unfollow } from '../models/follows.js';
import { ensureRedis, redis } from '../config/redis.js';


export async function followUser (req, res, next) {
try {
const { userId } = req.params;
await follow({ followerId: req.user.id, followeeId: userId });
await ensureRedis();
await redis.del(`timeline:${req.user.id}`); // reset cache for follower
res.status(204).end();
} catch (err) { next(err); }
}


export async function unfollowUser (req, res, next) {
try {
const { userId } = req.params;
await unfollow({ followerId: req.user.id, followeeId: userId });
await ensureRedis();
await redis.del(`timeline:${req.user.id}`);
res.status(204).end();
} catch (err) { next(err); }
}
