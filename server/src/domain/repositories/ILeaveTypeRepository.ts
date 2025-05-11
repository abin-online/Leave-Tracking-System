import { LeaveType } from "../entities/LeaveType";

export interface ILeaveTypeRepository {
    createLeaveType(leaveType: LeaveType): Promise<LeaveType>;
    updateLeaveType(leaveTypeId: string, leaveType: Partial<LeaveType>): Promise<LeaveType | null>;
    blockLeaveType(leaveTypeId: string): Promise<void>;
    getAllLeaveTypes(): Promise<LeaveType[]>; 
    getAllUnblockedLeaveTypes(): Promise<LeaveType[]>
    getLeaveTypeById(leaveTypeId: string): Promise<LeaveType | null>;
}
