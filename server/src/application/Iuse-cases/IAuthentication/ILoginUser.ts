import { User } from '../../../domain/entities/User';

export interface ILoginUserUseCase {
  execute(email: string, password: string): Promise<{
    accessToken: string;
    refreshToken: string;
    user: User;
  }>;
}
