import { query } from '../config/db.js';


export async function createUser ({ username, email, passwordHash }) {
const { rows } = await query(
`INSERT INTO users (username, email, password_hash)
VALUES ($1, $2, $3)
RETURNING id, username, email, created_at`,
[username, email, passwordHash]
);
return rows[0];
}


export async function getUserByEmail (email) {
const { rows } = await query('SELECT * FROM users WHERE email=$1', [email]);
return rows[0];
}


export async function getUserById (id) {
const { rows } = await query('SELECT id, username, email, created_at FROM users WHERE id=$1', [id]);
return rows[0];
}


export async function getUserByUsername (username) {
const { rows } = await query('SELECT id, username, email, created_at FROM users WHERE username=$1', [username]);
return rows[0];
}
