import { Router } from 'express';
import { getTimeline } from '../controllers/timelineController.js';
import { requireAuth } from '../middleware/auth.js';


const router = Router();
router.get('/', requireAuth, getTimeline);
export default router;
