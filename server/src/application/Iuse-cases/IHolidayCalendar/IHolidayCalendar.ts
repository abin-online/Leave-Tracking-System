import { HolidayCalendar } from "../../../domain/entities/HolidayCalendar";

export interface IHolidayCalendarUseCase {
  createCalendar(calendar: HolidayCalendar): Promise<HolidayCalendar>;
  getAllCalendars(): Promise<HolidayCalendar[]>;
  getUserCalendar(zone: string): Promise<HolidayCalendar | null>;
  updateCalendarHolidays(
    calendarId: string,
    holidays: HolidayCalendar["holidays"]
  ): Promise<HolidayCalendar | null>;
}
