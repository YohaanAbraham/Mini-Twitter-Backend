import { Router } from 'express';
import { like, unlike } from '../controllers/likeController.js';
import { requireAuth } from '../middleware/auth.js';


const router = Router();
router.post('/:tweetId', requireAuth, like);
router.delete('/:tweetId', requireAuth, unlike);
export default router;
