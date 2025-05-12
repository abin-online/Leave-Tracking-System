import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../../../../domain/enums/UserRole';
import { Gender } from '../../../../domain/enums/Gender';


export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  role: UserRole;
  zone?: string;
  gender: Gender;
  otp?: string;
  otpExpiry?: Date;
  isApproved: boolean;
  employees?: string[]
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    role: { type: String, enum: Object.values(UserRole), required: true },
    zone: { type: String },
    gender: { type: String, enum: Object.values(Gender), required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    isApproved: { type: Boolean, default: false },
    employees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
