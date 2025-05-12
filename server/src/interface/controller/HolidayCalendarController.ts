import { Request, Response } from "express";
import { IHolidayCalendarUseCase } from "../../application/Iuse-cases/IHolidayCalendar/IHolidayCalendar";


export class HolidayCalendarController {
    constructor(private holidayUseCase: IHolidayCalendarUseCase) { }

    createCalendar = async (req: Request, res: Response) => {
        const calendar = req.body;
        const created = await this.holidayUseCase.createCalendar(calendar);
        res.status(201).json(created);
    };

    getAllCalendars = async (_req: Request, res: Response) => {
        const calendars = await this.holidayUseCase.getAllCalendars();
        res.status(200).json(calendars);
    };

    getUserCalendar = async (req: Request, res: Response) => {
        const { zone } = req.params; 
        const calendar = await this.holidayUseCase.getUserCalendar(zone);
        res.status(200).json(calendar);
    };
    

    updateCalendarHolidays = async (req: Request, res: Response) => {
        const { calendarId } = req.params;
        const { holidays } = req.body;
        const updated = await this.holidayUseCase.updateCalendarHolidays(calendarId, holidays);
        res.status(200).json(updated);
    };
}
