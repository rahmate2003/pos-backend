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

// Middlewares
app.use(morgan('dev')); // Logging
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*', // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json());

// Routes
app.use('/api/v1', routes);

// 404 Not Found Handler
app.use(notFoundHandler);

// Error Handler
app.use(errorHandler);

export default app;