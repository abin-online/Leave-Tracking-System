import { LeaveUseCase } from "../../../application/use-cases/LeaveUseCase/LeaveUseCase";
import { LeaveRepository } from "../../../infrastructure/repositories/LeaveRequestRepository";
import { LeaveController } from "../../controller/LeaveController";

const leaveRepository = new LeaveRepository()
const leaveUseCase = new LeaveUseCase(leaveRepository);
export const leaveController = new LeaveController(leaveUseCase)