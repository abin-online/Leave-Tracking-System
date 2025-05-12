import { IZoneRepository } from '../../domain/repositories/IZoneRepository';
import ZoneModel from '../database/mongo/model/ZoneModel';
import { Zone } from '../../domain/entities/Zone';

export class ZoneRepository implements IZoneRepository {
    async create(zone: Zone): Promise<Zone> {
        const createdZone = new ZoneModel(zone);
        return createdZone.save();
    }

    async blockUnblock(zoneId: string, isActive: boolean): Promise<Zone | null> {
        return ZoneModel.findByIdAndUpdate(zoneId, { isActive }, { new: true });
    }

    async getAllZones(): Promise<Zone[]> {
        return ZoneModel.find();
    }

    async getActiveZones(): Promise<Zone[]> {
        return ZoneModel.find({ isActive: true });
    }
}
