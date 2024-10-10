import { Envs } from "./config/index.js";
import { MySQLDatabase } from "./data/index.js";
import { AppRoutes } from './presentacion/routes.js';
import { Server } from "./presentacion/server.js";

(async () => {
    main();
})();


function main() {

    MySQLDatabase.connect({
        database: Envs.MYSQL_DATABASE,
        username: Envs.MYSQL_USERNAME,
        password: Envs.MYSQL_PASSWORD,
        host: Envs.MYSQL_HOST,
    });

    const server = new Server({
        port: Envs.PORT,
        public_path: "public",
        routes: AppRoutes.routes
    });
    server.start();
}