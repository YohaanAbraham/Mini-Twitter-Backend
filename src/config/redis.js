import { createClient } from 'redis';


export const redis = createClient({ url: process.env.REDIS_URL });


redis.on('error', (err) => console.error('Redis Client Error', err));


export async function ensureRedis () {
if (!redis.isOpen) await redis.connect();
}
