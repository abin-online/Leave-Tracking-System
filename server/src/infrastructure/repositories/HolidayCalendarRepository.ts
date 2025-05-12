import { HolidayCalendarModel } from "../database/mongo/model/holidayCalendarModel";
import { IHolidayCalendarRepository } from "../../domain/repositories/IHolidayCalendarRepository";
import { HolidayCalendar } from "../../domain/entities/HolidayCalendar";

export class HolidayCalendarRepository implements IHolidayCalendarRepository {
  async createCalendar(calendar: HolidayCalendar): Promise<HolidayCalendar> {
    const created = await HolidayCalendarModel.create(calendar);
    return this.mapToEntity(created);
  }

  async getAllCalendars(): Promise<HolidayCalendar[]> {
    const calendars = await HolidayCalendarModel.find();
    return calendars.map(this.mapToEntity);
  }

  async findCalendarByZone(zone: string): Promise<HolidayCalendar | null> {
    const doc = await HolidayCalendarModel.findOne({ zone }).sort({ effectiveFrom: -1 });
    return doc ? this.mapToEntity(doc) : null;
  }

  async updateHolidays(calendarId: string, holidays: HolidayCalendar["holidays"]): Promise<HolidayCalendar | null> {
    const updated = await HolidayCalendarModel.findByIdAndUpdate(
      calendarId,
      { holidays },
      { new: true }
    );
    return updated ? this.mapToEntity(updated) : null;
  }

  private mapToEntity(doc: any): HolidayCalendar {
    const obj = doc.toObject();
    return {
      ...obj,
      _id: obj._id.toString(),
    };
  }
}
