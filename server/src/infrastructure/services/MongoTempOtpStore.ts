import { ITempOtpStore } from "../../domain/services/ITempOtpStore";
import { SignupOtpModel } from "../database/mongo/model/SignupOtpModel";

export class MongoTempOtpStore implements ITempOtpStore {
    async saveSignupOTP(data: {
        name: string;
        email: string;
        gender: string;
        otp: string;
        otpExpiry: Date;
        passwordHash: string;
    }): Promise<void> {
        await SignupOtpModel.findOneAndUpdate(
            { email: data.email },
            { $set: data },
            { upsert: true, new: true }
        );
    }

    async getSignupOTP(email: string): Promise<{
        name: string;
        email: string;
        gender: string;
        otp: string;
        otpExpiry: Date;
        passwordHash: string;
    } | null> {
        const doc = await SignupOtpModel.findOne({ email });
        return doc ? {
            name: doc.name,
            email: doc.email,
            gender: doc.gender,
            otp: doc.otp,
            otpExpiry: doc.otpExpiry,
            passwordHash: doc.passwordHash
        } : null;
    }

    async deleteSignupOTP(email: string): Promise<void> {
        await SignupOtpModel.deleteOne({ email });
    }
}
