import { ITempOtpStore } from '../../../domain/services/ITempOtpStore';
import { IAuthService } from '../../../domain/services/IAuthService';
import { IEmailService } from '../../../domain/services/IEmailService';
import { Gender } from '../../../domain/enums/Gender';

export class SignupUserUseCase {
  constructor(
    private authService: IAuthService,
    private emailService: IEmailService,
    private tempOtpStore: ITempOtpStore,
  ) { }

  async execute(name: string, email: string, password: string, gender: Gender): Promise<{ otp: string }> {

    const otp = this.authService.generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    const passwordHash = await this.authService.hashPassword(password);

    await this.tempOtpStore.saveSignupOTP({
      name,
      email,
      gender,
      otp,
      passwordHash,
      otpExpiry
    });

    const sent = await this.emailService.sendOTP(email, otp, name);
    if (!sent) {
      console.warn('OTP email failed to send');
    }

    return { otp };
  }
}
