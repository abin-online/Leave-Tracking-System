import { UserRepository } from '../../../infrastructure/repositories/UserRepository';
import { AuthService } from '../../../infrastructure/services/AuthService';
import { EmailService } from '../../../infrastructure/services/EmailService';
import { MongoTempOtpStore } from '../../../infrastructure/services/MongoTempOtpStore';
import { SignupUserUseCase } from '../../../application/use-cases/authentication/signupUser';
import { VerifyOtpUseCase } from '../../../application/use-cases/authentication/verifyOtp';
import { LoginUserUseCase } from '../../../application/use-cases/authentication/loginUser';
import { SignupManagerUseCase } from '../../../application/use-cases/authentication/signupManager';
import { LoginManagerUseCase } from '../../../application/use-cases/authentication/loginManager';
import { ApproveManagerUseCase } from '../../../application/use-cases/authentication/approveManager';
import { AuthController } from '../../controller/AuthController';
import { AuthMiddleware } from '../../middleware/authMiddleware';
import { ErrorMiddleware } from '../../middleware/errorMiddleware';
import { AdminLoginUseCase } from '../../../application/use-cases/authentication/adminLogin';
import { AssignEmployeeToManager } from '../../../application/use-cases/authentication/IAssignEmployeesToManager';

// Dependency Injection
const userRepository = new UserRepository();
const authService = new AuthService();
const emailService = new EmailService()
const tempOtpStore = new MongoTempOtpStore();

// Use Cases
const signupUserUseCase = new SignupUserUseCase(authService, emailService, tempOtpStore);
const verifyOtpUseCase = new VerifyOtpUseCase(userRepository, authService, tempOtpStore);
const loginUserUseCase = new LoginUserUseCase(userRepository, authService);
const signupManagerUseCase = new SignupManagerUseCase(userRepository, authService);
const loginManagerUseCase = new LoginManagerUseCase(userRepository, authService);
const approveManagerUseCase = new ApproveManagerUseCase(userRepository);
const adminLoginUseCase = new AdminLoginUseCase(userRepository, authService)
const assignEmployeeToManager = new AssignEmployeeToManager(userRepository)

// Controllers
export const authController = new AuthController(
  signupUserUseCase,
  verifyOtpUseCase,
  loginUserUseCase,
  signupManagerUseCase,
  loginManagerUseCase,
  approveManagerUseCase,
  adminLoginUseCase,
  assignEmployeeToManager
);

export const authMiddleware = new AuthMiddleware(authService, userRepository);
export const errorMiddleware = new ErrorMiddleware();