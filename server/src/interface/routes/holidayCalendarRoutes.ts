import { Router } from "express";
import { holidayCalendarController as controller } from "./dependencyInjection/holidayCalendarRoutes";
import { authMiddleware } from "./dependencyInjection/authentication";

export const createHolidayCalendarRouter = (

): Router => {
  const router = Router();

  // Admin routes
  router.post(
    "/admin/holiday-calendar",
    authMiddleware.authenticate,
    authMiddleware.adminOnly,
    controller.createCalendar
  );

  router.get(
    "/admin/holiday-calendars",
    authMiddleware.authenticate,
    authMiddleware.adminOnly,
    controller.getAllCalendars
  );

  router.patch(
    "/admin/holiday-calendar/:calendarId",
    authMiddleware.authenticate,
    authMiddleware.adminOnly,
    controller.updateCalendarHolidays
  );

  // User route
  router.get(
    "/user/holiday-calendar/:zone",
    authMiddleware.authenticate,
    controller.getUserCalendar
  );

  return router;
};
