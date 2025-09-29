import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tweetRoutes from './routes/tweetRoutes.js';
import followRoutes from './routes/followRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js';


const app = express();


app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));


app.get('/health', (req, res) => res.json({ status: 'ok' }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/timeline', timelineRoutes);


// Error fallback
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


export default app;
