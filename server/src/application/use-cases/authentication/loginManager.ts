import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { UserRole } from '../../../domain/enums/UserRole';
import { User } from '../../../domain/entities/User';

export class LoginManagerUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user : User}> {

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== UserRole.MANAGER) {
      throw new Error('Invalid login method for this user');
    }

    if (!user.isApproved) {
      throw new Error('Your account is pending approval by an admin');
    }

    if (!user.passwordHash) {
      throw new Error('Password not set for this user');
    }

    const isPasswordValid = await this.authService.comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.authService.generateTokens(user._id, user.role);

    return { accessToken, refreshToken, user };
  }
}