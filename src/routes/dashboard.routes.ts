// src/routes/auth.routes.ts
import express from 'express';
import { checkRole } from '../middlewares/role.middleware';
import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// Contoh endpoint yang memerlukan role tertentu
router.get('/superadmin', authenticate, checkRole('super_admin'), (req, res) => {
  res.json({ message: 'Welcome to Super Admin Dashboard' });
});

router.get('/owner',authenticate, checkRole('owner'), (req, res) => {
  res.json({ message: 'Welcome to Owner Dashboard' });
});

router.get('/admin',authenticate, checkRole('admin_toko'), (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

router.get('/kasir', authenticate, checkRole('admin_toko'), (req, res) => {
  res.json({ message: 'Welcome to Kasir Dashboard' });
});

export default router;