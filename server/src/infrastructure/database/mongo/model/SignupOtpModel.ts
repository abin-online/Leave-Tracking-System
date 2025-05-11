import mongoose, { Document, Schema } from 'mongoose';

interface ISignupOtp extends Document {
    name: string;
    email: string;
    gender: string;
    otp: string;
    passwordHash: string;
    otpExpiry: Date;
}

const SignupOtpSchema = new Schema<ISignupOtp>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    otp: { type: String, required: true },
    passwordHash: { type: String, required: true },
    otpExpiry: { type: Date, required: true }
}, {
    timestamps: true 
});

export const SignupOtpModel = mongoose.model<ISignupOtp>('SignupOtp', SignupOtpSchema);
