import { getUserById, getUserByUsername } from '../models/users.js';


export async function me (req, res, next) {
try {
const user = await getUserById(req.user.id);
res.json({ user });
} catch (err) { next(err); }
}


export async function getByUsername (req, res, next) {
try {
const user = await getUserByUsername(req.params.username);
if (!user) return res.status(404).json({ error: 'Not found' });
res.json({ user });
} catch (err) { next(err); }
}
