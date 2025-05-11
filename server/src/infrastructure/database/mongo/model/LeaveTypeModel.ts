import mongoose, { Schema, Document } from "mongoose";

export interface ILeaveType extends Document {
    code: string;
    internalName: string;
    displayName: string;
    description: string;
    effectiveDate: Date;
    period: {
        start: string;
        end: string;
    };
    accrual: {
        type: "unlimited" | "timeBased" | "frequencyBased";
        frequency?: "monthly" | "yearly" | "quarterly";
        accrueAt?: "start" | "end";
        maxAccrual?: number;
        timeBased?: {
            employeeField: string;
            durationIn: "days" | "months" | "years";
            value: number;
        };
    };
    carryForward: {
        enabled: boolean;
        max?: number;
    };
    proRated: boolean;
    includeNonWorkingDays: boolean;
    includePublicHolidays: boolean;
    allowModificationPostApplication: boolean;
    futureDated: boolean;
    minInSingleSpell?: number;
    maxInSingleSpell?: number;
    maxNegativeBalance: number;
    active: boolean;
}

const LeaveTypeSchema: Schema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        internalName: { type: String, required: true },
        displayName: { type: String, required: true },
        description: { type: String },

        effectiveDate: { type: Date, required: true },

        period: {
            start: { type: String, required: true },
            end: { type: String, required: true },
        },

        accrual: {
            type: {
                type: String,
                enum: ["unlimited", "timeBased", "frequencyBased"],
                required: true,
            },
            frequency: {
                type: String,
                enum: ["monthly", "yearly", "quarterly"],
            },
            accrueAt: {
                type: String,
                enum: ["start", "end"],
            },
            maxAccrual: { type: Number },
            timeBased: {
                employeeField: { type: String },
                durationIn: {
                    type: String,
                    enum: ["days", "months", "years"],
                },
                value: { type: Number },
            },
        },

        carryForward: {
            enabled: { type: Boolean, required: true },
            max: { type: Number },
        },

        proRated: { type: Boolean, required: true },
        includeNonWorkingDays: { type: Boolean, required: true },
        includePublicHolidays: { type: Boolean, required: true },
        allowModificationPostApplication: { type: Boolean, required: true },
        futureDated: { type: Boolean, required: true },

        minInSingleSpell: { type: Number },
        maxInSingleSpell: { type: Number },
        maxNegativeBalance: { type: Number, required: true },

        active: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export const LeaveTypeModel = mongoose.model<ILeaveType>("LeaveType", LeaveTypeSchema);
