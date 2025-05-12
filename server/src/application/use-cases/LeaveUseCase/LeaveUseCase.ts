import { ILeaveUseCase } from "../../Iuse-cases/ILeaveUseCase/ILeaveUseCase";
import { ILeaveRepository } from "../../../domain/repositories/ILeaveRepository";
import { LeaveRequestDocument, LeaveStatus } from "../../../domain/entities/LeaveApplication";


export class LeaveUseCase implements ILeaveUseCase {
    constructor(private leaveRepository: ILeaveRepository) { }

    // Apply leave
    applyLeave = async (data: {
        employeeId: string;
        leaveTypeId: string;
        appliedBy: string;
        fromDate: Date;
        toDate: Date;
        reason?: string;
    }): Promise<LeaveRequestDocument> => {
        const leaveRequest = {
            employeeId: data.employeeId,
            leaveTypeId: data.leaveTypeId,
            appliedBy: data.appliedBy,
            fromDate: data.fromDate,
            toDate: data.toDate,
            reason: data.reason,
            status: 'pending', // Default status
        };

        return this.leaveRepository.createLeaveRequest(leaveRequest);
    };

    // Request to edit leave
    requestEditLeave = async (
        leaveRequestId: string,
        userId: string,
        editData: { newFromDate: Date; newToDate: Date; newReason?: string }
    ): Promise<LeaveRequestDocument> => {
        const leaveRequest = await this.leaveRepository.findLeaveById(leaveRequestId);
        if (!leaveRequest) throw new Error("Leave request not found");

        if (leaveRequest.employeeId !== userId) {
            throw new Error("User is not authorized");
        }

        leaveRequest.fromDate = editData.newFromDate;
        leaveRequest.toDate = editData.newToDate;
        if (editData.newReason) leaveRequest.reason = editData.newReason;

        const editRequest = this.leaveRepository.updateLeaveRequest(leaveRequestId, leaveRequest);
        return this.MapLeaveRequest(editRequest)
    };

    changeStatus = async (
        leaveRequestId: string,
        userId: string,
        status: LeaveStatus,
        message?: string
    ): Promise<LeaveRequestDocument> => {
        const leaveRequest = await this.leaveRepository.findLeaveById(leaveRequestId);
        if (!leaveRequest) throw new Error("Leave request not found");

        // Prevent the requester from changing their own leave request status
        if (leaveRequest.appliedBy === userId) {
            throw new Error("You cannot change the status of your own leave request");
        }

        // Set the status and message
        leaveRequest.status = status;


        // Handle status-specific fields (like approval, rejection, etc.)
        if (status === 'approved') {
            leaveRequest.approvalInfo = {
                approvedBy: userId,
                approvedAt: new Date(),
                message: message || '',
            };
        } else if (status === 'rejected') {
            leaveRequest.rejectionInfo = {
                rejectedBy: userId,
                rejectedAt: new Date(),
                reason: message || '',
            };
        } else if (status === 'cancelled') {
            leaveRequest.cancellationInfo = {
                cancelledBy: userId,
                cancelledAt: new Date(),
                message: message || '',
            };
        }

        const updatedLeave = this.leaveRepository.updateLeaveRequest(leaveRequestId, leaveRequest);
        return this.MapLeaveRequest(updatedLeave)
    };

    getLeavesByUser = async (userId: string): Promise<LeaveRequestDocument[]> => {
        return this.leaveRepository.getLeavesByUser(userId);
    };

    getAllLeaves = async (): Promise<LeaveRequestDocument[]> => {
        return this.leaveRepository.getAllLeaves();
    };

    findLeaveById = async (leaveRequestId: string): Promise<LeaveRequestDocument | null> => {
        return this.leaveRepository.findLeaveById(leaveRequestId);
    };

    updateLeaveRequest = async (
        leaveRequestId: string,
        updateData: Partial<LeaveRequestDocument>
    ): Promise<LeaveRequestDocument | null> => {
        return this.leaveRepository.updateLeaveRequest(leaveRequestId, updateData);
    };

    private MapLeaveRequest = async (data: any): Promise<LeaveRequestDocument> => {
        return {
            _id: data._id.toString(),
            ...data
        }
    }
}
