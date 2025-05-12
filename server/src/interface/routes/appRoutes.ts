import { Router } from 'express';
import { createAuthRouter } from './authRoutes';
import { createAttendanceRouter } from './attendanceRoutes';
import { createHolidayCalendarRouter } from './holidayCalendarRoutes';
import { createLeaveRequestRouter } from './leaveRoutes';
import { createZoneRouter } from './zoneRoutes';
import { createLeaveTypeRouter } from './leaveTypeRoutes';
const router = Router();

router.use('/auth', createAuthRouter());
router.use('/attendance', createAttendanceRouter());
router.use('/holidayCalendar', createHolidayCalendarRouter());
router.use('/leave', createLeaveRequestRouter());
router.use('/leave-types', createLeaveTypeRouter());
router.use('/zone', createZoneRouter());

export default router;
