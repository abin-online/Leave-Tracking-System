import { Request, Response } from 'express';
import { ISignupUserUseCase } from '../../application/Iuse-cases/IAuthentication/ISignupUser';
import { IVerifyOtpUseCase } from '../../application/Iuse-cases/IAuthentication/IVerifyOtp';
import { ILoginUserUseCase } from '../../application/Iuse-cases/IAuthentication/ILoginUser';
import { ISignupManagerUseCase } from '../../application/Iuse-cases/IAuthentication/ISignupManager';
import { ILoginManagerUseCase } from '../../application/Iuse-cases/IAuthentication/ILoginManager';
import { IApproveManagerUseCase } from '../../application/Iuse-cases/IAuthentication/IApproveManager';
import { IAdminLoginUseCase } from '../../application/Iuse-cases/IAuthentication/IAdminLogin';
import { IAssignEmployeeToManagerUseCase } from '../../application/Iuse-cases/IAuthentication/IAssignEmployeesToManager';
import { HttpStatusCode } from '../../shared/types/HttpStatusCode';
import { Gender } from '../../domain/enums/Gender';

export class AuthController {
  constructor(
    private signupUserUseCase: ISignupUserUseCase,
    private verifyOtpUseCase: IVerifyOtpUseCase,
    private loginUserUseCase: ILoginUserUseCase,
    private signupManagerUseCase: ISignupManagerUseCase,
    private loginManagerUseCase: ILoginManagerUseCase,
    private approveManagerUseCase: IApproveManagerUseCase,
    private adminLoginUseCase: IAdminLoginUseCase,
    private assignEmployeeToManagerUseCase: IAssignEmployeeToManagerUseCase
  ) { }

  // User signup
  signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, gender, password } = req.body;

      if (!name || !email || !gender) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      if (!(gender in Gender)) {
        res.status(400).json({ message: 'Invalid gender value' });
        return
      }

      const enumGender = Gender[gender as keyof typeof Gender];

      const { otp } = await this.signupUserUseCase.execute(
        name,
        email,
        password,
        enumGender,
      );


      res.status(201).json({
        message: 'Signup OTP sent successfully. Please verify your email.',
        email,
        otp
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
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Email and password are required' });
        return;
      }

      const { accessToken, refreshToken, user } = await this.loginUserUseCase.execute(email, password);

      res.status(200).json({
        message: 'Login successfull',
        accessToken,
        refreshToken,
        email,
        role: 'employee',
        user
      });
    } catch (error) {
      console.error('Login user error:', error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: (error as Error).message || 'Login failed' });
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

      const { accessToken, refreshToken, user } = await this.loginManagerUseCase.execute(email, password);

      res.status(200).json({
        message: 'Manager login successful',
        accessToken,
        refreshToken,
        email,
        role: 'manager',
        user
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

      res.status(HttpStatusCode.OK).json({
        message: 'Manager approved successfully',
        managerId: manager._id,
        email: manager.email,
        isApproved: manager.isApproved
      });
    } catch (error) {
      console.error('Approve manager error:', error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: (error as Error).message || 'Failed to approve manager' });
    }
  };

  adminLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: 'Email and password are required' });
        return;
      }

      const { accessToken, refreshToken, user } = await this.adminLoginUseCase.execute(email, password);

      res.status(HttpStatusCode.OK).json({
        message: 'admin login successful',
        accessToken,
        refreshToken,
        email,
        role: 'admin',
        user
      });

    } catch (error) {
      console.error('Login manager error:', error);
      res.status(HttpStatusCode.BAD_REQUEST).json({ message: (error as Error).message || 'Login failed' });
    }
  };

  // Inside AuthController class
  assignEmployeesToManager = async (req: Request, res: Response): Promise<void> => {
    try {
      const { managerId, employeeId } = req.body;

      if (!managerId || !employeeId) {
        res.status(400).json({ message: 'managerId and employeeIds are required' });
        return;
      }

      await this.assignEmployeeToManagerUseCase.execute(managerId, employeeId);

      res.status(200).json({
        message: 'Employees assigned to manager successfully'
      });
    } catch (error) {
      console.error('Assign employees to manager error:', error);
      res.status(400).json({ message: (error as Error).message || 'Assignment failed' });
    }
  };

}