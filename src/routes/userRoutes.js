import { Router } from 'express';
import { me, getByUsername } from '../controllers/userController.js';
import { requireAuth } from '../middleware/auth.js';


const router = Router();
router.get('/me', requireAuth, me);
router.get('/:username', getByUsername);
export default router;
