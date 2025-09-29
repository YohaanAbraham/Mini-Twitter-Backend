import { query } from '../config/db.js';


export async function likeTweet ({ userId, tweetId }) {
await query(
`INSERT INTO likes (user_id, tweet_id)
VALUES ($1, $2)
ON CONFLICT DO NOTHING`,
[userId, tweetId]
);
}


export async function unlikeTweet ({ userId, tweetId }) {
await query('DELETE FROM likes WHERE user_id=$1 AND tweet_id=$2', [userId, tweetId]);
}


export async function countLikes (tweetId) {
const { rows } = await query('SELECT COUNT(*)::int AS count FROM likes WHERE tweet_id=$1', [tweetId]);
return rows[0]?.count || 0;
}
