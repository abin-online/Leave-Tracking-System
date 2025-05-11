import { IAttendanceRepository } from "../../domain/repositories/IAttendanceRepository";
import { AttendanceModel } from "../database/mongo/model/AttendanceModel";
import { Attendance } from "../../domain/entities/Attendance";

export class AttendanceRepository implements IAttendanceRepository {
    async checkIn(userId: string, date: Date): Promise<Attendance> {
        let attendance = await AttendanceModel.findOne({ userId, date });
        if (!attendance) {
            attendance = new AttendanceModel({
                userId,
                date,
                checkInTime: new Date(),
                status: "pending",
            });
        } else {
            attendance.checkInTime = new Date();
        }

        await attendance.save();
        return attendance.toObject();
    }

    async checkOut(userId: string, date: Date): Promise<Attendance> {
        const attendance = await AttendanceModel.findOne({ userId, date });
        if (!attendance) {
            throw new Error("Check-in required before check-out");
        }

        attendance.checkOutTime = new Date();
        await attendance.save();
        return attendance.toObject();
    }

    async requestEdit(userId: string, date: Date, reason: string): Promise<Attendance> {
        const attendance = await AttendanceModel.findOne({ userId, date });
        if (!attendance) {
            throw new Error("Attendance not found for the given date");
        }

        attendance.editRequest = {
            reason,
            status: "pending",
        };

        await attendance.save();
        return attendance.toObject();
    }

    async getUserAttendance(userId: string, from: Date, to: Date): Promise<Attendance[]> {
        const attendanceRecords = await AttendanceModel.find({
            userId,
            date: { $gte: from, $lte: to },
        });

        return attendanceRecords.map((record) => record.toObject());
    }

    async resolveEditRequest(
        userId: string,
        date: Date,
        action: "approved" | "rejected",
        reviewedBy: string,
        reviewedAt: Date
    ): Promise<void> {
        const attendance = await AttendanceModel.findOne({ userId, date });
        if (!attendance || !attendance.editRequest) {
            throw new Error("Edit request not found");
        }

        attendance.editRequest.status = action;
        attendance.editRequest.reviewedBy = reviewedBy;
        attendance.editRequest.reviewedAt = reviewedAt;

        await attendance.save();
    }
}
