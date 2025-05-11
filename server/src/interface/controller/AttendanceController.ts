import { Request, Response } from "express";
import { IAttendanceUseCase } from "../../application/Iuse-cases/IAttendance/IAttendance";

export class AttendanceController {
    constructor(private readonly attendanceUseCase: IAttendanceUseCase) { }

    public checkIn = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params
            const result = await this.attendanceUseCase.checkIn(userId);
            res.status(200).json(result);
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error during check-in" });
            return
        }
    };

    public checkOut = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const result = await this.attendanceUseCase.checkOut(userId);
            res.status(200).json(result);
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error during check-out" });
            return
        }
    };

    public requestEdit = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params;
            const { date, reason } = req.body;
            const result = await this.attendanceUseCase.requestEdit(userId, date, reason);
            res.status(200).json(result);
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error requesting edit" });
            return
        }
    };

    public getMyAttendance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { userId } = req.params
            const { from, to } = req.query;
            const result = await this.attendanceUseCase.getMyAttendance(
                userId,
                new Date(from as string),
                new Date(to as string)
            );
            res.status(200).json(result);
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching attendance" });
            return
        }
    };

    public getEmployeeAttendance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { managerId } = req.params
            const { employeeId } = req.params;
            const { from, to } = req.query;

            const result = await this.attendanceUseCase.getEmployeeAttendance(
                managerId,
                employeeId,
                new Date(from as string),
                new Date(to as string)
            );
            res.status(200).json(result);
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching employee attendance" });
            return
        }
    };

    public handleEditRequest = async (req: Request, res: Response): Promise<void> => {
        try {
            const { managerId } = req.params
            const { userId, date, action } = req.body;
            await this.attendanceUseCase.handleEditRequest(managerId, userId, new Date(date), action);
            res.status(200).json({ message: `Edit request ${action}ed` });
            return
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error handling edit request" });
            return
        }
    };
}
