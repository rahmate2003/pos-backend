// src/routes/index.ts
import express from 'express';
import authRoutes from './auth.routes';
import adminRoutes from './admin.routes'
import dashboardRoutes from './dashboard.routes'
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/superadmin', adminRoutes )
router.use('/dashboard', dashboardRoutes )
export default router;