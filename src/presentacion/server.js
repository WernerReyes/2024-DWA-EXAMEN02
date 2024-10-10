import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'path';

export class Server {
    constructor(options) {
        const { port, public_path = "public", routes } = options;
        this.app = express();
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
        this.__dirname = import.meta.dirname.replace('presentacion', '');

        this.configure();
    }


    configure() {
        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Public Folder
        this.app.use(express.static(join(this.__dirname, this.public_path)));

        //* Template Engine
        this.app.engine('hbs', engine({
            extname: '.hbs',
            defaultLayout: 'main',
            layoutsDir: join(this.__dirname, 'views/layouts'),
            partialsDir: join(this.__dirname, 'views/partials')
        }));
        this.app.set('view engine', 'hbs');
        this.app.set('views', join(this.__dirname, 'views'));

        //* Routes
        this.app.use(this.routes);
    }

    start() {
        this.app.use(express.static(this.public_path));
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}