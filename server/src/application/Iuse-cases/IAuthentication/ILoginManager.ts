import { User } from '../../../domain/entities/User';

export interface ILoginManagerUseCase {
  execute(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>;
}
