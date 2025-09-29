import { query } from '../config/db.js';


export async function follow ({ followerId, followeeId }) {
await query(
`INSERT INTO follows (follower_id, followee_id)
VALUES ($1, $2)
ON CONFLICT DO NOTHING`,
[followerId, followeeId]
);
}


export async function unfollow ({ followerId, followeeId }) {
await query(
'DELETE FROM follows WHERE follower_id=$1 AND followee_id=$2',
[followerId, followeeId]
);
}


export async function listFollowees (followerId) {
const { rows } = await query(
'SELECT followee_id FROM follows WHERE follower_id=$1',
[followerId]
);
return rows.map(r => r.followee_id);
}
