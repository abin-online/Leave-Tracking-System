import { Request, Response } from 'express';
import { SignupUserUseCase } from '../../application/use-cases/user/signupUser';
import { VerifyOtpUseCase } from '../../application/use-cases/user/verifyOtp';
import { LoginUserUseCase } from '../../application/use-cases/user/loginUser';
import { SignupManagerUseCase } from '../../application/use-cases/user/signupManager';
import { LoginManagerUseCase } from '../../application/use-cases/user/loginManager';
import { ApproveManagerUseCase } from '../../application/use-cases/user/approveManager';
import { Gender } from '../../domain/enums/Gender';

export class AuthController {
  constructor(
    private signupUserUseCase: SignupUserUseCase,
    private verifyOtpUseCase: VerifyOtpUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private signupManagerUseCase: SignupManagerUseCase,
    private loginManagerUseCase: LoginManagerUseCase,
    private approveManagerUseCase: ApproveManagerUseCase
  ) {}

  // User signup
  signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, gender } = req.body;

      if (!name || !email || !gender) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const { user, otp } = await this.signupUserUseCase.execute(
        name, 
        email, 
        gender as Gender
      );

      // In production, send OTP via email or SMS instead of returning it directly
      res.status(201).json({ 
        message: 'User created successfully. Please verify your email with the OTP',
        userId: user._id,
        email: user.email,
        otp // Only for development! In production, send this via email/SMS
      });
    } catch (error) {
      console.error('Signup user error:', error);
      res.status(400).json({ message: (error as Error).message || 'Failed to create user' });
    }
  };

  // OTP verification
  verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        res.status(400).json({ message: 'Email and OTP are required' });
        return;
      }

      const { accessToken, refreshToken } = await this.verifyOtpUseCase.execute(email, otp);

      res.status(200).json({ 
        message: 'OTP verified successfully',
        accessToken, 
        refreshToken 
      });
    } catch (error) {
      console.error('Verify OTP error:', error);
      res.status(400).json({ message: (error as Error).message || 'OTP verification failed' });
    }
  };

  // User login
  loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
      }

      const { otp } = await this.loginUserUseCase.execute(email);

      // In production, send OTP via email or SMS
      res.status(200).json({ 
        message: 'OTP sent to your email', 
        otp // Only for development! In production, send this via email/SMS
      });
    } catch (error) {
      console.error('Login user error:', error);
      res.status(400).json({ message: (error as Error).message || 'Login failed' });
    }
  };

  // Manager signup
  signupManager = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, gender } = req.body;

      if (!name || !email || !password || !gender) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const manager = await this.signupManagerUseCase.execute(
        name, 
        email, 
        password, 
        gender as Gender
      );

      res.status(201).json({ 
        message: 'Manager signup successful. Pending admin approval',
        managerId: manager._id,
        email: manager.email
      });
    } catch (error) {
      console.error('Signup manager error:', error);
      res.status(400).json({ message: (error as Error).message || 'Failed to create manager' });
    }
  };

  // Manager login
  loginManager = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
        return;
      }

      const { accessToken, refreshToken } = await this.loginManagerUseCase.execute(email, password);

      res.status(200).json({ 
        message: 'Manager login successful', 
        accessToken, 
        refreshToken 
      });
    } catch (error) {
      console.error('Login manager error:', error);
      res.status(400).json({ message: (error as Error).message || 'Login failed' });
    }
  };

  // Admin approves manager
  approveManager = async (req: Request, res: Response): Promise<void> => {
    try {
      const { managerId } = req.params;
      const adminId = req.userId;

      if (!adminId || !managerId) {
        res.status(400).json({ message: 'Missing required parameters' });
        return;
      }

      const manager = await this.approveManagerUseCase.execute(adminId, managerId);

      res.status(200).json({ 
        message: 'Manager approved successfully',
        managerId: manager._id,
        email: manager.email,
        isApproved: manager.isApproved
      });
    } catch (error) {
      console.error('Approve manager error:', error);
      res.status(400).json({ message: (error as Error).message || 'Failed to approve manager' });
    }
  };
}