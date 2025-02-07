// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  
  const status = (err as HttpError).status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
