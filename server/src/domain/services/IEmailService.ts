export interface IEmailService {
    sendOTP(email: string, otp: string, name: string): Promise<boolean>;
    sendWelcomeEmail(email: string, name: string): Promise<boolean>;
    sendManagerApprovalEmail(email: string, name: string): Promise<boolean>;
}