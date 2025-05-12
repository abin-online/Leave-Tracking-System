import { IZoneUseCase } from '../../Iuse-cases/IZoneUseCases/Zone';
import { IZoneRepository } from '../../../domain/repositories/IZoneRepository';
import { Zone } from '../../../domain/entities/Zone';

export class ZoneUseCase implements IZoneUseCase {
  constructor(private zoneRepository: IZoneRepository) {}

  async createZone(zone: Zone): Promise<Zone> {
    return this.zoneRepository.create(zone);
  }

  async blockUnblockZone(zoneId: string, isActive: boolean): Promise<Zone | null> {
    return this.zoneRepository.blockUnblock(zoneId, isActive);
  }

  async getAllZones(): Promise<Zone[]> {
    return this.zoneRepository.getAllZones();
  }

  async getActiveZones(): Promise<Zone[]> {
    return this.zoneRepository.getActiveZones();
  }
}
