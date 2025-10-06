import { Router } from 'express';
import { create, listByUser } from '../controllers/tweetController.js';
import { requireAuth } from '../middleware/auth.js';


const router = Router();
router.post('/', requireAuth, create);
router.get('/user/:userId', listByUser);
export default router;
