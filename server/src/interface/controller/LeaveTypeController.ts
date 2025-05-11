import { Request, Response } from "express";
import { ILeaveTypeUseCase } from "../../application/Iuse-cases/ILeaveType/ILeaveTypeUseCase";
import { LeaveType } from "../../domain/entities/LeaveType";

export class LeaveTypeController {

    constructor(
        private leaveTypeUseCase: ILeaveTypeUseCase
    ) {}

    // Create a new leave type
    createLeaveType = async (req: Request, res: Response): Promise<void> => {
        try {
            const leaveTypeData: LeaveType = req.body;
            const newLeaveType = await this.leaveTypeUseCase.createLeaveType(leaveTypeData);
            res.status(201).json(newLeaveType);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating leave type" });
            return
        }
    };

    // Edit an existing leave type
    editLeaveType = async (req: Request, res: Response): Promise<void> => {
        try {
            const { leaveTypeId } = req.params;
            const leaveTypeData: Partial<LeaveType> = req.body;
            const updatedLeaveType = await this.leaveTypeUseCase.editLeaveType(leaveTypeId, leaveTypeData);

            if (!updatedLeaveType) {
                res.status(404).json({ message: "Leave type not found" });
                return
            }

            res.status(200).json(updatedLeaveType);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error editing leave type" });
            return
        }
    };

    // Block a leave type (soft delete or deactivate)
    blockLeaveType = async (req: Request, res: Response): Promise<void> => {
        try {
            const { leaveTypeId } = req.params;
            await this.leaveTypeUseCase.blockLeaveType(leaveTypeId);
            res.status(200).json({ message: "Leave type blocked successfully" });
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error blocking leave type" });
            return
        }
    };

    // Get all leave types
    getAllLeaveTypes = async (req: Request, res: Response): Promise<void> => {
        try {
            const leaveTypes = await this.leaveTypeUseCase.getAllLeaveTypes();
            res.status(200).json(leaveTypes);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching leave types" });
            return
        }
    };

    // Get all unblocked leave types
    getAllUnblockedLeaveTypes = async (req: Request, res: Response): Promise<void> => {
        try {
            const leaveTypes = await this.leaveTypeUseCase.getAllUnblockedLeaveTypew();
            res.status(200).json(leaveTypes);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching unblocked leave types" });
            return
        }
    };

    // Get a specific leave type by ID
    getLeaveTypeById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { leaveTypeId } = req.params;
            const leaveType = await this.leaveTypeUseCase.getLeaveTypeById(leaveTypeId);

            if (!leaveType) {
                res.status(404).json({ message: "Leave type not found" });
                return
            }

            res.status(200).json(leaveType);
            return
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching leave type" });
            return
        }
    };
}
