// src/routes/auth.routes.ts
import express from 'express';
import { superAdminLoginController, adminLoginController, kasirLoginController, refreshTokenController, registerController, ownerLoginController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', ...registerController);
router.post('/login/superadmin', ...superAdminLoginController);
router.post('/login/owner', ...ownerLoginController);
router.post('/login/admin', ...adminLoginController);
router.post('/login/kasir', ...kasirLoginController);
router.post('/refresh', ...refreshTokenController);
export default router;
