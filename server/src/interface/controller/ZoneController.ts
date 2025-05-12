import { Request, Response } from 'express';
import { IZoneUseCase } from '../../application/Iuse-cases/IZoneUseCases/Zone';
import { Zone } from '../../domain/entities/Zone';

export class ZoneController {
    constructor(private zoneUseCase: IZoneUseCase) { }

    async createZone(req: Request, res: Response): Promise<void> {
        try {
            const zone: Zone = req.body;
            const createdZone = await this.zoneUseCase.createZone(zone);
            res.status(201).json(createdZone);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async blockUnblockZone(req: Request, res: Response): Promise<void> {
        try {
            const { zoneId, isActive } = req.body;
            const updatedZone = await this.zoneUseCase.blockUnblockZone(zoneId, isActive);
            res.status(200).json(updatedZone);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllZones(req: Request, res: Response): Promise<void> {
        try {
            const zones = await this.zoneUseCase.getAllZones();
            res.status(200).json(zones);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getActiveZones(req: Request, res: Response): Promise<void> {
        try {
            const activeZones = await this.zoneUseCase.getActiveZones();
            res.status(200).json(activeZones);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
