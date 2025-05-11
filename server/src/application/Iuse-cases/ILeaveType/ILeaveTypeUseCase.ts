import { LeaveType } from "../../../domain/entities/LeaveType";

export interface ILeaveTypeUseCase {
    createLeaveType(leaveType: LeaveType): Promise<LeaveType>;
    editLeaveType(id: string, leaveType: Partial<LeaveType>): Promise<LeaveType | null>;
    blockLeaveType(id: string): Promise<void>;
    getAllLeaveTypes(): Promise<LeaveType[]>; 
    getAllUnblockedLeaveTypew(): Promise<LeaveType[]>
    getLeaveTypeById(leaveTypeId: string): Promise<LeaveType | null>;
}