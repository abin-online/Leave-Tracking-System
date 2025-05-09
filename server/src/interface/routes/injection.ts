import { UserRepository } from '../../infrastructure/repositories/UserRepository'; 
import { AuthService } from '../../infrastructure/services/AuthService';
import { SignupUserUseCase } from '../../application/use-cases/user/signupUser';
import { VerifyOtpUseCase } from '../../application/use-cases/user/verifyOtp';
import { LoginUserUseCase } from '../../application/use-cases/user/loginUser';
import { SignupManagerUseCase } from '../../application/use-cases/user/signupManager';
import { LoginManagerUseCase } from '../../application/use-cases/user/loginManager';
import { ApproveManagerUseCase } from '../../application/use-cases/user/approveManager';
import { AuthController } from '../controller/AuthController';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { ErrorMiddleware } from '../middleware/errorMiddleware';
import { createAuthRouter } from './authRoutes';

// Setup Dependency Injection
const userRepository = new UserRepository();
const authService = new AuthService();

// Use Cases
const signupUserUseCase = new SignupUserUseCase(userRepository, authService);
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, authService);
const loginUserUseCase = new LoginUserUseCase(userRepository, authService);
const signupManagerUseCase = new SignupManagerUseCase(userRepository, authService);
const loginManagerUseCase = new LoginManagerUseCase(userRepository, authService);
const approveManagerUseCase = new ApproveManagerUseCase(userRepository);

// Controllers
export const authController = new AuthController(
  signupUserUseCase,
  verifyOtpUseCase,
  loginUserUseCase,
  signupManagerUseCase,
  loginManagerUseCase,
  approveManagerUseCase
);

export const authMiddleware = new AuthMiddleware(authService);
export const errorMiddleware = new ErrorMiddleware();