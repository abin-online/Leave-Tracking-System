import { Router } from "express";
import { leaveTypeController } from "./dependencyInjection/LeaveType";
import { authMiddleware } from "./dependencyInjection/authentication";

export const createLeaveTypeRouter = (): Router => {
    const router = Router();

    // Create a new leave type (Admin only, I assume?)
    router.post(
        "/leave-types",
        authMiddleware.authenticate,
        authMiddleware.adminOnly, // Add role-based check if needed
        leaveTypeController.createLeaveType
    );

    // Edit existing leave type
    router.put(
        "/leave-types/:leaveTypeId",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        leaveTypeController.editLeaveType
    );

    // Block (deactivate) a leave type
    router.patch(
        "/leave-types/:leaveTypeId/block",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        leaveTypeController.blockLeaveType
    );

    
    router.get(
        "/leave-types",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        leaveTypeController.getAllLeaveTypes
    );

    // Get all unblocked leave types (everyone can access)
    router.get(
        "/leave-types/unblocked",
        authMiddleware.authenticate,
        leaveTypeController.getAllUnblockedLeaveTypes
    );

    router.get(
        "/leave-types/:leaveTypeId",
        authMiddleware.authenticate,
        leaveTypeController.getLeaveTypeById
    );

    return router;
};
