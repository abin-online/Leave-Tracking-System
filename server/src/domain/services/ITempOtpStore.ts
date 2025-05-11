export interface ITempOtpStore {
    saveSignupOTP(data: {
        name: string;
        email: string;
        gender: string; 
        otp: string;
        passwordHash: string;
        otpExpiry: Date;
    }): Promise<void>;

    getSignupOTP(email: string): Promise<{
        name: string;
        email: string;
        gender: string;
        otp: string;
        passwordHash: string;
        otpExpiry: Date;
    } | null>;

    deleteSignupOTP(email: string): Promise<void>;
}
