import { Sequelize } from 'sequelize';
import { RoleModel } from './models/role.model.js';
import { UserModel } from './models/user.model.js';


export class MySQLDatabase {

    static sequelize;

    static async connect(options) {
        const { database, username, password, host } = options;
        try {

            this.sequelize = new Sequelize(database, username, password, {
                host: host,
                dialect: 'mysql',
            });

            //* Initialize models
            RoleModel.init(this.sequelize);
            UserModel.init(this.sequelize);
            

            //* Associate models
            UserModel.associate({ RoleModel });
            RoleModel.associate({ UserModel });
          

            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    static async disconnect() {
        await this.sequelize.close();
    }
}
