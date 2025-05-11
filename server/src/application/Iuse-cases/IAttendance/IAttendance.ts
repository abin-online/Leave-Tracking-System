import { Attendance } from "../../../domain/entities/Attendance";

export interface IAttendanceUseCase {
    checkIn(
        userId: string
    ): Promise<Attendance>;

    checkOut(
        userId: string
    ): Promise<Attendance>;

    requestEdit(
        userId: string,
        date: Date,
        reason: string
    ): Promise<Attendance>;

    getMyAttendance(userId: string,
        from: Date,
        to: Date
    ): Promise<Attendance[]>;

    getEmployeeAttendance(
        managerId: string,
        employeeId: string,
        from: Date,
        to: Date
    ): Promise<Attendance[]>;

    handleEditRequest(
        managerId: string,
        userId: string,
        date: Date,
        action: "approved" | "rejected"
    ): Promise<void>;
}
