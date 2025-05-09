import { UserRepository } from '../../interfaces/UserRepository';
import { User } from '../../../domain/entities/User';

export class AuthenticateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    // Implement password verification logic here
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    return isPasswordValid ? user : null;
  }
}
