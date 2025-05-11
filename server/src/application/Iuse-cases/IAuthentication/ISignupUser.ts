import { Gender } from '../../../domain/enums/Gender';

export interface ISignupUserUseCase {
  execute(name: string, email: string, password: string, gender: Gender): Promise<{
    otp: string;
  }>;
}
