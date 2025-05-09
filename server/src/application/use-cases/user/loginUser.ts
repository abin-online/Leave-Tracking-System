import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { UserRole } from '../../../domain/enums/UserRole';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string): Promise<{ otp: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Check if user role is USER
    if (user.role !== UserRole.USER) {
      throw new Error('Invalid login method for this user');
    }

    // Generate OTP
    const otp = this.authService.generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    // Update user with new OTP
    await this.userRepository.update(user._id, {
      otp,
      otpExpiry,
      updatedAt: new Date()
    });

    return { otp };
  }
}
