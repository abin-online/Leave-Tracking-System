import { User } from "../../../domain/entities/User";

export interface IAssignEmployeeToManagerUseCase {
    execute(managerId: string, employeeId: string): Promise<User>;
}
