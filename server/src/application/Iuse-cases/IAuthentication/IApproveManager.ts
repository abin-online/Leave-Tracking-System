import { User } from '../../../domain/entities/User';

export interface IApproveManagerUseCase {
  execute(adminId: string, managerId: string): Promise<User>;
}
