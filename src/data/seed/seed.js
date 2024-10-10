import { Envs } from "../../config/index.js";
import { MySQLDatabase, RoleModel, UserModel } from "../index.js";
import { SEED_DATA } from "./data.js";

(async () => {
    await MySQLDatabase.connect({
        database: Envs.MYSQL_DATABASE,
        username: Envs.MYSQL_USERNAME,
        password: Envs.MYSQL_PASSWORD,
        host: Envs.MYSQL_HOST,
    });
    

    await seed();

    await MySQLDatabase.disconnect();
})()

async function seed() {
      //* Delete all rows in the table
    await Promise.all([
        UserModel.destroy({ where: {}, truncate: false }),
        RoleModel.destroy({ where: {}, truncate: false }),
    ])

    //* Create ( Roles )
    await RoleModel.bulkCreate(SEED_DATA.roles); 

    //* Create ( Users )
    await UserModel.bulkCreate(SEED_DATA.users);

    console.log("Seed data has been created successfully");
}