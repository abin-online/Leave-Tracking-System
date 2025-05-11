import { IAttendanceUseCase } from "../../Iuse-cases/IAttendance/IAttendance";
import { IAttendanceRepository } from "../../../domain/repositories/IAttendanceRepository";
import { Attendance } from "../../../domain/entities/Attendance";

export class AttendanceUseCase implements IAttendanceUseCase {
    constructor(private readonly attendanceRepo: IAttendanceRepository) { }

    async checkIn(userId: string): Promise<Attendance> {
        const today = new Date();
        const dateOnly = new Date(today.toDateString());
        return await this.attendanceRepo.checkIn(userId, dateOnly);
    }

    async checkOut(userId: string): Promise<Attendance> {
        const today = new Date();
        const dateOnly = new Date(today.toDateString());
        return await this.attendanceRepo.checkOut(userId, dateOnly);
    }

    async requestEdit(userId: string, date: Date, reason: string): Promise<Attendance> {
        const dateOnly = new Date(date.toDateString());
        return await this.attendanceRepo.requestEdit(userId, dateOnly, reason);
    }

    async getMyAttendance(userId: string, from: Date, to: Date): Promise<Attendance[]> {
        const fromDate = new Date(from.toDateString());
        const toDate = new Date(to.toDateString());
        return await this.attendanceRepo.getUserAttendance(userId, fromDate, toDate);
    }

    async getEmployeeAttendance(
        managerId: string,
        employeeId: string,
        from: Date,
        to: Date
    ): Promise<Attendance[]> {

        const fromDate = new Date(from.toDateString());
        const toDate = new Date(to.toDateString());
        return await this.attendanceRepo.getUserAttendance(employeeId, fromDate, toDate);
    }

    async handleEditRequest(
        managerId: string,
        userId: string,
        date: Date,
        action: "approved" | "rejected"
    ): Promise<void> {

        const dateOnly = new Date(date.toDateString());
        await this.attendanceRepo.resolveEditRequest(userId, dateOnly, action, managerId, new Date());
    }
}