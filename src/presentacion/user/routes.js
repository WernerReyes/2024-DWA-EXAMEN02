import { Router } from 'express';
import { UserController } from './controller.js';
import { UserService } from '../services/user.service.js';

export class UserRoutes {
    static get routes() {
        const router = Router();

        const userService = new UserService();
        const userController = new UserController(userService);

        router.get('/', userController.getAll);
        router.post('/', userController.add);
        router.post('/:id', userController.edit);
        router.get('/:id', userController.delete);

        return router;
    }
}