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
    isApproved?: boolean; 
    employees? : string[]
    createdAt: Date;
    updatedAt: Date;
}
