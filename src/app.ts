// src/app.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';

const app = express();

app.use(morgan('dev')); 
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});
app.use(limiter);
app.use(express.json());
app.use('/api/v1', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;