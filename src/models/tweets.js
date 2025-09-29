import { query } from '../config/db.js';


export async function createTweet ({ userId, content }) {
const { rows } = await query(
`INSERT INTO tweets (user_id, content)
VALUES ($1, $2)
RETURNING id, user_id, content, created_at`,
[userId, content]
);
return rows[0];
}


export async function getTweetById (id) {
const { rows } = await query('SELECT * FROM tweets WHERE id=$1', [id]);
return rows[0];
}


export async function listTweetsByUser (userId, { limit = 20, cursor } = {}) {
if (cursor) {
const { rows } = await query(
`SELECT * FROM tweets
WHERE user_id=$1 AND created_at < to_timestamp($2)
ORDER BY created_at DESC
LIMIT $3`,
[userId, cursor, limit]
);
return rows;
}
const { rows } = await query(
`SELECT * FROM tweets
WHERE user_id=$1
ORDER BY created_at DESC
LIMIT $2`,
[userId, limit]
);
return rows;
}
