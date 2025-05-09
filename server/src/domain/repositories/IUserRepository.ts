import { User } from '../entities/User';
import { UserRole } from '../enums/UserRole';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  findByRole(role: UserRole): Promise<User[]>;
  findPendingManagers(): Promise<User[]>;
}