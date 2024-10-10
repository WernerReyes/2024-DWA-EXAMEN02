import { Router } from 'express';
import { RoleController } from './controller.js';
import { RoleService } from '../services/role.service.js';

export class RoleRoutes {
    static get routes() {
        const router = Router();

        const roleService = new RoleService();
        const roleController = new RoleController(roleService);

        router.get('/', roleController.getAll);
        router.post('/', roleController.add);
        router.post('/:id', roleController.edit);
        router.get('/:id', roleController.delete);

        return router;
    }
}