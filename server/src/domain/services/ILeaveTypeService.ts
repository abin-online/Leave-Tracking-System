import { LeaveType } from "../entities/LeaveType";

export interface ILeaveTypeService {
  createLeaveType(name: string, description: string): Promise<LeaveType>;
  editLeaveType(id: string, name: string, description: string): Promise<LeaveType>;
  blockLeaveType(id: string): Promise<void>;
}