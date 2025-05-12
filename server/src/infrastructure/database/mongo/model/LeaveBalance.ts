import { Schema, Document, Types, model } from 'mongoose';

export interface LeaveBalance extends Document {
    userId: Types.ObjectId;
    leaveTypeId: string;
    carriedForward: number;
    accrued: number;
    used: number;
    adjusted?: number;
    balance: number;
    lastUpdated: Date;
}

const LeaveBalanceSchema = new Schema<LeaveBalance>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true
    },
    leaveTypeId: {
        type: String,
        required: true,
    },
    carriedForward: {
        type: Number,
        default: 0,
    },
    accrued: {
        type: Number,
        default: 0,
    },
    used: {
        type: Number,
        default: 0,
    },
    adjusted: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
        required: true,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});


export const LeaveBalanceModel = model<LeaveBalance>('LeaveBalance', LeaveBalanceSchema);
