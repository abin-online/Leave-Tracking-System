import { Zone } from "../../../domain/entities/Zone";

export interface IZoneUseCase {
  createZone(zone: Zone): Promise<Zone>;
  blockUnblockZone(zoneId: string, isActive: boolean): Promise<Zone | null>;
  getAllZones(): Promise<Zone[]>;
  getActiveZones(): Promise<Zone[]>;
}
