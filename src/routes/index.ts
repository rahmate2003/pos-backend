// src/routes/index.ts
import express from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes'
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/superadmin', adminRoutes )
export default router;