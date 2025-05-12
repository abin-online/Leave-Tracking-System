import { Router } from "express";
import { attendanceController } from "./dependencyInjection/attendance";
import { authMiddleware } from "./dependencyInjection/authentication";
export const createAttendanceRouter = (): Router => {
    const router = Router();

    router.post(
        '/attendance/:userId/check-in',
        authMiddleware.authenticate, 
        attendanceController.checkIn 
    );

    router.post(
        '/attendance/:userId/check-out',
        authMiddleware.authenticate, 
        attendanceController.checkOut 
    );

    router.post(
        '/attendance/:userId/:date/edit-request',
        authMiddleware.authenticate, 
        attendanceController.requestEdit 
    );

    router.get(
        '/attendance/:userId',
        authMiddleware.authenticate, 
        attendanceController.getMyAttendance 
    );

    // Routes for manager to access employee attendance
    router.get(
        '/attendance/:managerId/employees/:employeeId',
        authMiddleware.authenticate, 
        authMiddleware.managerOrAdminCanAccessEmployee, // Ensure the manager can access the employee's data
        attendanceController.getEmployeeAttendance 
    );

    
    router.patch(
        '/attendance/:managerId/employees/:employeeId/edit-request',
        authMiddleware.authenticate, // Ensure manager is authenticated
        authMiddleware.managerOrAdminCanAccessEmployee, // Ensure manager can edit employee's attendance
        attendanceController.handleEditRequest // Controller for handling the edit request
    );

    return router;
};
