import { Router } from 'express';
import { authController } from './injection';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { UserRole } from '../../domain/enums/UserRole';
import { AuthService } from '../../infrastructure/services/AuthService';

export const createAuthRouter = (authService: AuthService): Router => {
    const router = Router();
    const authMiddleware = new AuthMiddleware(authService);

    // User routes
    router.post('/user/signup', authController.signupUser);
    router.post('/user/verify-otp', authController.verifyOtp);
    router.post('/user/login', authController.loginUser);

    // Manager routes
    router.post('/manager/signup', authController.signupManager);
    router.post('/manager/login', authController.loginManager);

    // Admin routes
    router.put(
        '/admin/approve-manager/:managerId',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.ADMIN]),
        authController.approveManager
    );

    return router;
};
