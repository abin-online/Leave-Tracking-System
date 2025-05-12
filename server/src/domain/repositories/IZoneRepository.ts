import { Zone } from '../entities/Zone';

export interface IZoneRepository {
  create(zone: Zone): Promise<Zone>;
  blockUnblock(zoneId: string, isActive: boolean): Promise<Zone | null>;
  getAllZones(): Promise<Zone[]>;
  getActiveZones(): Promise<Zone[]>;
}
