import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/users.js';
import { hashPassword, comparePassword } from '../utils/hash.js';


function signToken (userId) {
return jwt.sign({}, process.env.JWT_SECRET, {
subject: userId,
expiresIn: process.env.JWT_EXPIRES_IN || '7d'
});
}


export async function register (req, res, next) {
try {
const { username, email, password } = req.body;
if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });
const passwordHash = await hashPassword(password);
const user = await createUser({ username, email, passwordHash });
const token = signToken(user.id);
res.status(201).json({ user, token });
} catch (err) { next(err); }
}


export async function login (req, res, next) {
try {
const { email, password } = req.body;
const user = await getUserByEmail(email);
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await comparePassword(password, user.password_hash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = signToken(user.id);
res.json({ user: { id: user.id, username: user.username, email: user.email }, token });
} catch (err) { next(err); }
}
