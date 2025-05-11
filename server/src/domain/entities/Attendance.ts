export interface Attendance {
    userId: string;
    date: Date;
    checkInTime?: Date;
    checkOutTime?: Date;
    status: 'approved' | 'pending' | 'missed';
    editRequest?: {
      reason: string;
      status: 'pending' | 'approved' | 'rejected';
      reviewedBy?: string;
      reviewedAt?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
  }