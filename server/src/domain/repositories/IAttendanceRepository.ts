import { Attendance } from "../entities/Attendance";

export interface IAttendanceRepository {
    checkIn(userId: string, date: Date): Promise<Attendance>;
    checkOut(userId: string, date: Date): Promise<Attendance>;
    requestEdit(userId: string, date: Date, reason: string): Promise<Attendance>;
    getUserAttendance(userId: string, from: Date, to: Date): Promise<Attendance[]>;
    resolveEditRequest(
        userId: string,
        date: Date,
        action: "approved" | "rejected",
        reviewedBy: string,
        reviewedAt: Date
    ): Promise<void>;
}
