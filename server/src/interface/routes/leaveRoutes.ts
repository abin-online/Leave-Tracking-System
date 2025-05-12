import { Router } from "express";
import { leaveController } from "./dependencyInjection/LeaveRequest"
import { authMiddleware } from "./dependencyInjection/authentication";

export const createLeaveRequestRouter = (
): Router => {
  const router = Router();
  

  // User routes
  router.post(
    "/user/leave-request",
    authMiddleware.authenticate,
    leaveController.applyLeave
  );

  router.patch(
    "/user/leave-request/:leaveRequestId/edit",
    authMiddleware.authenticate,
    leaveController.requestEditLeave
  );

  router.delete(
    "/user/leave-request/:leaveRequestId/cancel",
    authMiddleware.authenticate,
    leaveController.changeLeaveStatus
  );

  router.post(
    "/admin/manager/leave-request/:userId",
    authMiddleware.authenticate,
    authMiddleware.managerOrAdminCanAccessEmployee,
    leaveController.applyLeave
  );

  // Use the generalized changeLeaveStatus for approve, reject, cancel
  router.patch(
    "/admin/manager/leave-request/:leaveRequestId/approve",
    authMiddleware.authenticate,
    authMiddleware.managerOrAdminCanAccessEmployee,
    leaveController.changeLeaveStatus
  );

  router.patch(
    "/admin/manager/leave-request/:leaveRequestId/reject",
    authMiddleware.authenticate,
    authMiddleware.managerOrAdminCanAccessEmployee,
    leaveController.changeLeaveStatus
  );

  // Admin route to get all leave requests
  router.get(
    "/admin/leave-requests",
    authMiddleware.authenticate,
    authMiddleware.adminOnly,
    leaveController.getAllLeavesForAdmin
  );

  // User route to get their own leave requests
  router.get(
    "/user/leave-requests",
    authMiddleware.authenticate,
    leaveController.getAllLeavesForUser
  );

  return router;
};
