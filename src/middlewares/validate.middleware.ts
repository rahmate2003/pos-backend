import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
   if (error) {
      res.status(400).json({
        success: false,
        errors: error.details.map((err) => ({
          field: err.path.join('.'),
          message: err.message // Using the actual error message from Joi
        }))
      });

      return;
    }

    return next();
  };
};
