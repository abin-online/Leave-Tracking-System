import mongoose, { Schema, Document } from 'mongoose';

interface IEditRequest {
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: Date;
}

export interface IAttendanceDocument extends Document {
    userId: string;
    date: Date;
    checkInTime?: Date;
    checkOutTime?: Date;
    status: 'approved' | 'pending' | 'missed';
    editRequest?: IEditRequest;
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema<IAttendanceDocument>({
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    checkInTime: { type: Date },
    checkOutTime: { type: Date },
    status: {
        type: String,
        enum: ['approved', 'pending', 'missed'],
        default: 'pending',
    },
    editRequest: {
        reason: String,
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
        },
        reviewedBy: String,
        reviewedAt: Date,
    },
}, {
    timestamps: true,
});

export const AttendanceModel = mongoose.model<IAttendanceDocument>('Attendance', AttendanceSchema);
