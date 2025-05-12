import { LeaveRequestDocument } from "../entities/LeaveApplication";


export interface ILeaveRepository {

    createLeaveRequest(data: any): Promise<LeaveRequestDocument>;
    findLeaveById(leaveRequestId: string): Promise<LeaveRequestDocument | null>;
    updateLeaveRequest(leaveRequestId: string, updateData: any): Promise<LeaveRequestDocument | null>;
    getLeavesByUser(userId: string): Promise<LeaveRequestDocument[]>;
    getAllLeaves(): Promise<LeaveRequestDocument[]>;
}
