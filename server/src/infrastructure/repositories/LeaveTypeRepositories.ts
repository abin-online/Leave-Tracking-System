import { ILeaveTypeRepository } from "../../domain/repositories/ILeaveTypeRepository";
import { LeaveType } from "../../domain/entities/LeaveType";
import { LeaveTypeModel } from "../database/mongo/model/LeaveTypeModel";

export class LeaveTypeRepository implements ILeaveTypeRepository {

    async createLeaveType(leaveType: LeaveType): Promise<LeaveType> {
        const createdLeaveType = await LeaveTypeModel.create(leaveType);
        return this.mapToLeaveType(createdLeaveType)
    }

    async updateLeaveType(leaveTypeId: string, leaveType: Partial<LeaveType>): Promise<LeaveType | null> {
        const updatedLeaveType = await LeaveTypeModel.findByIdAndUpdate(leaveTypeId, leaveType, { new: true });
        return updatedLeaveType ? this.mapToLeaveType(updatedLeaveType) : null;
    }

    async blockLeaveType(leaveTypeId: string): Promise<void> {
        await LeaveTypeModel.findByIdAndUpdate(leaveTypeId, { active: false });
    }

    async getAllLeaveTypes(): Promise<LeaveType[]> {
        const leaveTypes = await LeaveTypeModel.find()
        return leaveTypes.map(this.mapToLeaveType);
    }

    async getAllUnblockedLeaveTypes(): Promise<LeaveType[]> {
        const activeleaveTypes = await LeaveTypeModel.find()
        return activeleaveTypes.map(this.mapToLeaveType);
    }

    async getLeaveTypeById(leaveTypeId: string): Promise<LeaveType | null> {
        return await LeaveTypeModel.findById(leaveTypeId);
    }

    private mapToLeaveType(doc: any): LeaveType {
        return {
            ...doc.toObject(),
            _id: doc._id.toString(),
        };
    }
}
