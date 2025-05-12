import { Request, Response } from "express";
import { ILeaveUseCase } from "../../application/Iuse-cases/ILeaveUseCase/ILeaveUseCase";
import { CustomRequest } from "../../shared/types/ServerTypes";

export class LeaveController {
    constructor(private leaveUseCase: ILeaveUseCase) { }

    applyLeave = async (req: Request, res: Response): Promise<void> => {
        const leaveData = req.body;
        const appliedBy = req.userId;
        const response = await this.leaveUseCase.applyLeave({
            ...leaveData,
            appliedBy,
        });
        res.status(201).json(response);
        return
    };

    requestEditLeave = async (req: Request, res: Response): Promise<void> => {
        const { leaveRequestId } = req.params;
        const editData = req.body;
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized: Missing user info" });
            return;
        }
        const response = await this.leaveUseCase.requestEditLeave(
            leaveRequestId,
            userId,
            editData
        );
        res.status(200).json(response);
    };


    findLeaveById = async (req: Request, res: Response): Promise<void> => {
        const { leaveRequestId } = req.params;
        const response = await this.leaveUseCase.findLeaveById(leaveRequestId);

        if (!response) {
            res.status(404).json({ message: "Leave request not found" });
            return
        }

        res.status(200).json(response);
    };



    updateLeaveRequest = async (req: Request, res: Response): Promise<void> => {
        const { leaveRequestId } = req.params;
        const updateData = req.body;
        const response = await this.leaveUseCase.updateLeaveRequest(leaveRequestId, updateData);

        if (!response) {
            res.status(404).json({ message: "Leave request not found" });
            return
        }

        res.status(200).json(response);
    };

    // status change 
    changeLeaveStatus = async (req: CustomRequest, res: Response): Promise<void> => {
        const { leaveRequestId } = req.params;
        const userId = req.userId;
        const { status, message } = req.body;

        if (!userId || !req.userRole) {
            res.status(401).json({ message: "Unauthorized: Missing user info" });
            return;
        }

        if (!['approved', 'rejected', 'cancelled'].includes(status)) {
            res.status(400).json({ message: "Invalid status" });
            return
        }

        const response = await this.leaveUseCase.changeStatus(
            leaveRequestId,
            userId,
            status,
            message
        );
        res.status(200).json(response);
    };

    // Get leaves for a user
    getAllLeavesForUser = async (req: CustomRequest, res: Response): Promise<void> => {
        const { userId } = req;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized: Missing user info" });
            return;
        }
        const leaves = await this.leaveUseCase.getLeavesByUser(userId);
        res.status(200).json(leaves);
    };

    getAllLeavesForAdmin = async (_req: Request, res: Response): Promise<void> => {
        const leaves = await this.leaveUseCase.getAllLeaves();
        res.status(200).json(leaves);
    };
}
