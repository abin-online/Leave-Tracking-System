import { HolidayCalendarUseCase } from "../../../application/use-cases/HolidayCalendar/HolidayCalendar";
import { HolidayCalendarRepository } from "../../../infrastructure/repositories/HolidayCalendarRepository";
import { HolidayCalendarController } from "../../controller/HolidayCalendarController";

const holidayCalendarRepository = new HolidayCalendarRepository();
const holidayCalendarUseCase = new HolidayCalendarUseCase(holidayCalendarRepository);
export const holidayCalendarController = new HolidayCalendarController(holidayCalendarUseCase)