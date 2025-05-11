import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IAuthService } from "../../../domain/services/IAuthService";
import { IEmailService } from "../../../domain/services/IEmailService";

export class AssignEmployeeToManager {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(managerId: string, employeeId: string): Promise<User> {

        const manager = await this.userRepository.findById(managerId);

        if (!manager || manager.role !== 'manager' || !manager.isApproved) {
            throw new Error('Invalid or unapproved manager');
        }


        const updatedManager = await this.userRepository.assignEmployeesToManager(managerId, employeeId);

        if (!updatedManager) {
            throw new Error('Failed to assign employee to manager');
        }

        return updatedManager
    }
}
