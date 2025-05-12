import { IHolidayCalendarRepository } from "../../../domain/repositories/IHolidayCalendarRepository";
import { IHolidayCalendarUseCase } from "../../Iuse-cases/IHolidayCalendar/IHolidayCalendar";
import { HolidayCalendar } from "../../../domain/entities/HolidayCalendar";
export class HolidayCalendarUseCase implements IHolidayCalendarUseCase {
    constructor(private holidayCalendarRepo: IHolidayCalendarRepository) { }

    async createCalendar(calendar: HolidayCalendar) {
        return this.holidayCalendarRepo.createCalendar(calendar);
    }

    async getAllCalendars() {
        return this.holidayCalendarRepo.getAllCalendars();
    }

    async getUserCalendar(zone: string) {
        return this.holidayCalendarRepo.findCalendarByZone(zone);
    }

    async updateCalendarHolidays(calendarId: string, holidays: HolidayCalendar["holidays"]) {
        return this.holidayCalendarRepo.updateHolidays(calendarId, holidays);
    }
}
