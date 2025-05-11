import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { ITempOtpStore } from '../../../domain/services/ITempOtpStore';
import { UserRole } from '../../../domain/enums/UserRole';
import { Gender } from '../../../domain/enums/Gender';

export class VerifyOtpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
    private tempOtpStore: ITempOtpStore
  ) { }

  async execute(email: string, otp: string): Promise<{ accessToken: string; refreshToken: string }> {

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already verified and exists. Please login.');
    }
    console.log(email, otp, '____________')

    const tempData = await this.tempOtpStore.getSignupOTP(email);
    if (!tempData) {
      throw new Error('No signup request found or OTP expired.');
    }
    console.log('temp Data', tempData)
    const { name, gender, otp: savedOtp, otpExpiry, passwordHash } = tempData;


    if (otp !== savedOtp || !otpExpiry || otpExpiry < new Date()) {
      throw new Error('Invalid or expired OTP');
    }

    const newUser = await this.userRepository.create({
      name,
      email,
      passwordHash,
      gender: gender as Gender,
      role: UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    await this.tempOtpStore.deleteSignupOTP(email);

    const { accessToken, refreshToken } = this.authService.generateTokens(newUser._id, newUser.role);

    return { accessToken, refreshToken };
  }
}
