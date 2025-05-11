import { LeaveTypeUseCase } from "../../../application/use-cases/leave-type/LeaveTypeUseCases";
import { LeaveTypeRepository } from "../../../infrastructure/repositories/LeaveTypeRepositories";
import { LeaveTypeController } from "../../controller/LeaveTypeController";

const leaveTypeRepository = new LeaveTypeRepository();
const leaveTypeUseCase = new LeaveTypeUseCase(leaveTypeRepository);
export const leaveTypeController = new LeaveTypeController(leaveTypeUseCase);

