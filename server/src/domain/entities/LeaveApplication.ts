export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'edited';

export interface LeaveRequestDocument {
    _id: string;
    employeeId: string;
    leaveTypeId: string;
    appliedBy: string;
    fromDate: Date;
    toDate: Date;
    reason?: string;

    status: LeaveStatus;

    approvalInfo?: {
        approvedBy: string;
        approvedAt: Date;
        message?: string;
    };

    rejectionInfo?: {
        rejectedBy: string;
        rejectedAt: Date;
        reason?: string;
    };

    cancellationInfo?: {
        cancelledBy: string;
        cancelledAt: Date;
        message?: string;
    };

    editRequest?: {
        newFromDate: Date;
        newToDate: Date;
        newReason?: string;
        requestedAt: Date;
        status: 'pending' | 'approved' | 'rejected';
        decisionBy?: string;
        decisionMessage?: string;
    };

    createdAt: Date;
    updatedAt: Date;
}
