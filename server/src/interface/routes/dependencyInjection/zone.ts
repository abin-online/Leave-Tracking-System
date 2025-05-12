import { ZoneUseCase } from "../../../application/use-cases/ZoneUseCases/Zone";
import { ZoneRepository } from "../../../infrastructure/repositories/ZoneRepository";
import { ZoneController } from "../../controller/ZoneController";

const zoneRepository = new ZoneRepository;
const zoneUseCase = new ZoneUseCase(zoneRepository);
export const zoneController = new ZoneController(zoneUseCase);