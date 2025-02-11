// src/routes/admin.routes.ts
import express from 'express';
import { checkRole } from '../middlewares/role.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Hanya admin yang bisa mengakses route ini
router.get('/iya', authenticate, checkRole('SuperAdmin'), (req, res) => {
  res.json({
    success: true,
    message: 'Welcome, Admin!',
  });
});

export default router;