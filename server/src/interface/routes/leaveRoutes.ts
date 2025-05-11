import { Router } from 'express';
import { UserRole } from '../../domain/enums/UserRole'; 
import { AuthMiddleware } from '../middleware/authMiddleware';
import { AuthService } from '../../infrastructure/services/AuthService';
import { leaveTypeController } from './dependencyInjection/LeaveType';
import { authMiddleware } from './dependencyInjection/authentication';

export const createLeaveTypeRouter = (authService : AuthService): Router => {
    const router = Router();

    router.post(
        '/admin/leaveTypes',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.ADMIN]),
        leaveTypeController.createLeaveType
    );

    router.put(
        '/admin/leaveTypes/:leaveTypeId',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.ADMIN]),
        leaveTypeController.editLeaveType
    );

    router.patch(
        '/admin/leaveTypes/:leaveTypeId',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.ADMIN]),
        leaveTypeController.blockLeaveType
    );

    // Get all leave types
    router.get(
        '/admin/leaveTypes',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.ADMIN]),
        leaveTypeController.getAllLeaveTypes
    );


    router.get(
        '/leaveTypes/list',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.MANAGER, UserRole.USER]),
        leaveTypeController.getAllUnblockedLeaveTypes
    );


    router.get(
        '/leaveTypes/:leaveTypeId',
        authMiddleware.authenticate,
        authMiddleware.authorizeRole([UserRole.MANAGER, UserRole.USER]),
        leaveTypeController.getLeaveTypeById
    );

    return router;
};
