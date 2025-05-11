import { ILeaveTypeUseCase } from "../../Iuse-cases/ILeaveType/ILeaveTypeUseCase";
import { ILeaveTypeRepository } from "../../../domain/repositories/ILeaveTypeRepository";
import { LeaveType } from "../../../domain/entities/LeaveType";

export class LeaveTypeUseCase implements ILeaveTypeUseCase {
    constructor(private leaveTypeRepository: ILeaveTypeRepository) { }

    async createLeaveType(LeaveTypeData: LeaveType): Promise<LeaveType> {
        return await this.leaveTypeRepository.createLeaveType(LeaveTypeData);
    }

    async editLeaveType(leaveTypeId: string, leaveType: Partial<LeaveType>): Promise<LeaveType | null> {
        return await this.leaveTypeRepository.updateLeaveType(leaveTypeId, leaveType)
    }

    async blockLeaveType(leaveTypeId: string): Promise<void> {
        return await this.leaveTypeRepository.blockLeaveType(leaveTypeId)
    }

    async getAllLeaveTypes(): Promise<LeaveType[]> {
        return await this.leaveTypeRepository.getAllLeaveTypes();
    }

    async getAllUnblockedLeaveTypew(): Promise<LeaveType[]> {
        return await this.leaveTypeRepository.getAllUnblockedLeaveTypes()
    }

    async getLeaveTypeById(leaveTypeId: string): Promise<LeaveType | null> {
        return await this.leaveTypeRepository.getLeaveTypeById(leaveTypeId)
    }

}