import { User } from '../../../domain/entities/User';
import { Gender } from '../../../domain/enums/Gender';

export interface ISignupManagerUseCase {
  execute(name: string, email: string, password: string, gender: Gender): Promise<User>;
}
