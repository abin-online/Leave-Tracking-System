import { LeaveRequestDocument } from "../../../domain/entities/LeaveApplication";
export interface ILeaveUseCase {
    applyLeave(data: {
        employeeId: string;
        leaveTypeId: string;
        appliedBy: string;
        fromDate: Date;
        toDate: Date;
        reason?: string;
    }): Promise<LeaveRequestDocument>;

    requestEditLeave(
        leaveRequestId: string,
        userId: string,
        editData: {
            newFromDate: Date;
            newToDate: Date;
            newReason?: string;
        }
    ): Promise<LeaveRequestDocument>;

    changeStatus(
        leaveRequestId: string,
        userId: string,
        status: string,
        message?: string
    ): Promise<LeaveRequestDocument>;

    getLeavesByUser(userId: string): Promise<LeaveRequestDocument[]>;

    getAllLeaves(): Promise<LeaveRequestDocument[]>;

    findLeaveById(leaveRequestId: string): Promise<LeaveRequestDocument | null>;

    updateLeaveRequest(
        leaveRequestId: string,
        updateData: Partial<LeaveRequestDocument>
    ): Promise<LeaveRequestDocument | null>;
}
