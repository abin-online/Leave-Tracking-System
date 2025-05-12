import { ILeaveRepository } from "../../domain/repositories/ILeaveRepository";
import { LeaveRequestDocument } from "../../domain/entities/LeaveApplication";
import { LeaveRequestModel } from "../database/mongo/model/LeaveRequestModel ";

export class LeaveRepository implements ILeaveRepository {
    // Find a leave request by ID
    findLeaveById = async (leaveRequestId: string): Promise<LeaveRequestDocument | null> => {
        try {
            const leaveRequest = await LeaveRequestModel.findById(leaveRequestId);
            return leaveRequest as LeaveRequestDocument;
        } catch (error: any) {
            throw new Error("Error fetching leave request: " + error.message);
        }
    };

    // Update a leave request
    updateLeaveRequest = async (
        leaveRequestId: string,
        updatedLeaveRequest: LeaveRequestDocument
    ): Promise<LeaveRequestDocument> => {
        try {
            const leaveRequest = await LeaveRequestModel.findByIdAndUpdate(
                leaveRequestId,
                updatedLeaveRequest,
                { new: true } // Return the updated document
            );
            if (!leaveRequest) throw new Error("Leave request not found");
            return leaveRequest as LeaveRequestDocument;
        } catch (error: any) {
            throw new Error("Error updating leave request: " + error.message);
        }
    };

    // Get all leave requests for a user
    getLeavesByUser = async (userId: string): Promise<LeaveRequestDocument[]> => {
        try {
            const leaves: LeaveRequestDocument[] = await LeaveRequestModel.find({ appliedBy: userId });
            return leaves;
        } catch (error: any) {
            throw new Error("Error fetching leave requests: " + error.message);
        }
    };

    // Get all leave requests (for admin purposes)
    getAllLeaves = async (): Promise<LeaveRequestDocument[]> => {
        try {
            const allLeaves: LeaveRequestDocument[] = await LeaveRequestModel.find();
            return allLeaves;
        } catch (error: any) {
            throw new Error("Error fetching all leave requests: " + error.message);
        }
    };

    // Create a new leave request
    createLeaveRequest = async (leaveData: LeaveRequestDocument): Promise<LeaveRequestDocument> => {
        try {
            const newLeaveRequest = new LeaveRequestModel(leaveData);
            await newLeaveRequest.save();
            return newLeaveRequest as LeaveRequestDocument;
        } catch (error: any) {
            throw new Error("Error creating leave request: " + error.message);
        }
    };
}
