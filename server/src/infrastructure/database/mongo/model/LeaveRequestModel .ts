import mongoose, { Schema, Document } from "mongoose";

export interface LeaveRequestDocument extends Document {
    employeeId: string;
    leaveTypeId: string;
    appliedBy: string;
    fromDate: Date;
    toDate: Date;
    reason?: string;
    status: string;

    approvalInfo?: {
        approvedBy: string;
        approvedAt: Date;
        message?: string;
    };

    rejectionInfo?: {
        rejectedBy: string;
        rejectedAt: Date;
        reason?: string;
    };

    cancellationInfo?: {
        cancelledBy: string;
        cancelledAt: Date;
        message?: string;
    };

    createdAt: Date;
    updatedAt: Date;
}

const LeaveRequestSchema = new Schema<LeaveRequestDocument>(
    {
        employeeId: { type: String, required: true },
        leaveTypeId: { type: String, required: true },
        appliedBy: { type: String, required: true },
        fromDate: { type: Date, required: true },
        toDate: { type: Date, required: true },
        reason: { type: String },
        status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled', 'edited'], default: 'pending' },

        approvalInfo: {
            approvedBy: String,
            approvedAt: Date,
            message: String,
        },

        rejectionInfo: {
            rejectedBy: String,
            rejectedAt: Date,
            reason: String,
        },

        cancellationInfo: {
            cancelledBy: String,
            cancelledAt: Date,
            message: String,
        },
    },
    { timestamps: true }
);

export const LeaveRequestModel = mongoose.model<LeaveRequestDocument>("LeaveRequest", LeaveRequestSchema);
