import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';

export class VerifyOtpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string, otp: string): Promise<{ accessToken: string; refreshToken: string }> {
    // Find user by email
    const user  = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if OTP exists and not expired
    if (!user.otp || !user.otpExpiry || user.otpExpiry < new Date()) {
      throw new Error('OTP expired or invalid');
    }

    // Verify OTP
    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Clear OTP
    await this.userRepository.update(user?._id, {
      otp: undefined,
      otpExpiry: undefined,
      updatedAt: new Date()
    });

    // Generate tokens
    const { accessToken, refreshToken } = this.authService.generateTokens(user._id, user.role);

    return { accessToken, refreshToken };
  }
}