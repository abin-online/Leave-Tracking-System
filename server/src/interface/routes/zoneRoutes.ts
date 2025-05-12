import { Router } from "express";
import { zoneController } from "./dependencyInjection/zone";
import { authMiddleware } from "./dependencyInjection/authentication";
export const createZoneRouter = (
    
): Router => {
    const router = Router();

    router.post(
        "/admin/zone",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        zoneController.createZone
    );

    router.patch(
        "/admin/zone",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        zoneController.blockUnblockZone
    );

    router.get(
        "/admin/zones",
        authMiddleware.authenticate,
        authMiddleware.adminOnly,
        zoneController.getAllZones
    );

    router.get(
        "/user/zone",
        authMiddleware.authenticate,
        zoneController.getActiveZones
    );

    return router;
};
