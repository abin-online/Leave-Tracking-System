import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { UserRole } from '../../../domain/enums/UserRole';
import { Gender } from '../../../domain/enums/Gender';

export class SignupUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(name: string, email: string, gender: Gender): Promise<{ user: User; otp: string }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate OTP
    const otp = this.authService.generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP valid for 10 minutes

    // Create user
    const user = await this.userRepository.create({
      name,
      email,
      gender,
      role: UserRole.USER,
      otp,
      otpExpiry,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return { user, otp };
  }
}