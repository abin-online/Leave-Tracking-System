import { Schema, model, Document } from 'mongoose';

interface Holiday {
    name: string;
    date: Date;
}

export interface HolidayCalendarDocument extends Document {
    name: string;
    zone: string;
    year: number;
    holidays: Holiday[];
    effectiveFrom: Date;
    createdAt: Date;
    updatedAt: Date;
}

const HolidaySchema = new Schema<Holiday>(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { _id: false }
);

const HolidayCalendarSchema = new Schema<HolidayCalendarDocument>(
    {
        name: { type: String, required: true },
        zone: { type: String, required: true },
        year: { type: Number, required: true },
        holidays: { type: [HolidaySchema], default: [] },
        effectiveFrom: { type: Date, required: true },
    },
    { timestamps: true }
);

export const HolidayCalendarModel = model<HolidayCalendarDocument>(
    'HolidayCalendar',
    HolidayCalendarSchema
);
