import { Router } from 'express';
import { createAuthRouter } from './authRoutes';
import { AuthService } from '../../infrastructure/services/AuthService';

// You can instantiate any services here (or use a proper DI later)
const authService = new AuthService();

const router = Router();

router.use('/auth', createAuthRouter(authService));

// Add other feature routes below like:
// router.use('/feedback', createFeedbackRouter());
// router.use('/users', createUserRouter());

export default router;
