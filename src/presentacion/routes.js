import { Router } from 'express';
import { RoleRoutes } from './role/routes.js';
import { UserRoutes } from './user/routes.js';

export class AppRoutes {
    static get routes() {
        const router = Router();

        router.get('/', (req, res) => {
            res.render('home', { title: 'Home' });
        });

        router.use('/roles', RoleRoutes.routes);
        router.use('/users', UserRoutes.routes);
        
        return router;
    }
}