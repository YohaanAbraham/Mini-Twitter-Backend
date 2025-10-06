import { likeTweet, unlikeTweet, countLikes } from '../models/likes.js';


export async function like (req, res, next) {
try {
await likeTweet({ userId: req.user.id, tweetId: req.params.tweetId });
const count = await countLikes(req.params.tweetId);
res.json({ likes: count });
} catch (err) { next(err); }
}


export async function unlike (req, res, next) {
try {
await unlikeTweet({ userId: req.user.id, tweetId: req.params.tweetId });
const count = await countLikes(req.params.tweetId);
res.json({ likes: count });
} catch (err) { next(err); }
}
