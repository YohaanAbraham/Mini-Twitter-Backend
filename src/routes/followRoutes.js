import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/followController.js';
import { requireAuth } from '../middleware/auth.js';


const router = Router();
router.post('/:userId', requireAuth, followUser);
router.delete('/:userId', requireAuth, unfollowUser);
export default router;
