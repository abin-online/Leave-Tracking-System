export interface HolidayCalendar {
    _id: string;
    name: string;
    zone: string;
    year: number;
    holidays: Array<{
        name: string;
        date: Date;
    }>;
    effectiveFrom: Date;
}
