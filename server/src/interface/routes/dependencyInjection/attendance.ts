import { AttendanceUseCase } from "../../../application/use-cases/AttendanceUseCase/AttendanceUseCase";
import { AttendanceRepository } from "../../../infrastructure/repositories/AttendanceRepository";
import { AttendanceController } from "../../controller/AttendanceController";

const attendanceRepositoy = new AttendanceRepository();
const attendanceUseCase = new AttendanceUseCase(attendanceRepositoy)
export const attendanceController = new AttendanceController(attendanceUseCase)