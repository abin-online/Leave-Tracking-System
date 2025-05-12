import { HolidayCalendar } from "../entities/HolidayCalendar";
    
export interface IHolidayCalendarRepository {
  createCalendar(calendar: HolidayCalendar): Promise<HolidayCalendar>;
  getAllCalendars(): Promise<HolidayCalendar[]>;
  findCalendarByZone(zone: string): Promise<HolidayCalendar | null>;
  updateHolidays(calendarId: string, holidays: HolidayCalendar["holidays"]): Promise<HolidayCalendar | null>;
}
