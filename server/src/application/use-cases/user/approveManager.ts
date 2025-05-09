import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { UserRole } from '../../../domain/enums/UserRole';

export class ApproveManagerUseCase {
  constructor(
    private userRepository: IUserRepository
  ) {}

  async execute(adminId: string, managerId: string): Promise<User> {
    // Verify admin
    const admin = await this.userRepository.findById(adminId);
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new Error('Not authorized');
    }

    // Find manager
    const manager = await this.userRepository.findById(managerId);
    if (!manager || manager.role !== UserRole.MANAGER) {
      throw new Error('Manager not found');
    }

    // Update manager to approved status
    const updatedManager = await this.userRepository.update(managerId, {
      isApproved: true,
      updatedAt: new Date()
    });

    if (!updatedManager) {
      throw new Error('Failed to update manager');
    }

    return updatedManager;
  }
}