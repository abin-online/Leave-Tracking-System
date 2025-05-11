import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';
import { UserRole } from '../../../domain/enums/UserRole';
import { Gender } from '../../../domain/enums/Gender';

export class SignupManagerUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(name: string, email: string, password: string, gender: Gender): Promise<User> {
    // Check if manager already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await this.authService.hashPassword(password);

    // Create manager (pending approval)
    const user = await this.userRepository.create({
      name,
      email,
      passwordHash,
      gender,
      role: UserRole.MANAGER,
      isApproved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return user;
  }
}