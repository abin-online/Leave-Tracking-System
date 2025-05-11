export interface IVerifyOtpUseCase {
    execute(email: string, otp: string): Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
  }
  