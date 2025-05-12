import { Gender } from '../enums/Gender';
import { UserRole } from '../enums/UserRole';

export interface User {
    _id: string;
    name: string;
    email: string;
    passwordHash?: string;
    role: UserRole;
    gender: Gender;
    otp?: string;
    otpExpiry?: Date;
    isApproved?: boolean; // to register as manager, admin will later approve after signup
    employees? : string[];
    zone? : string;
    createdAt: Date;
    updatedAt: Date;
}
