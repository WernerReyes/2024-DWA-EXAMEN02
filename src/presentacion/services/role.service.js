import { RoleModel, UserModel } from "../../data/index.js";
import { Op } from "sequelize";

export class RoleService {
    constructor() { }

    async getAll() {
        try {
            return RoleModel.findAll({
                raw: true
            });
        } catch (err) {
            throw err;
        }
    }

    async getById(id) {
        try {
            const role = RoleModel.findOne({ where: { id } });
            if (!role) throw "Role not found";
        } catch (err) {
            throw err;
        }
    }


    async add(role) {
        let { name } = role;
        if (!name.trim()) throw "Name is required";

        name = name.toUpperCase().trim();

        const roleExists = await RoleModel.findOne({ where: { name } });
        if (roleExists) throw "Role already exists";

        try {
            return RoleModel.create({ name });
        } catch (err) {
            throw err;
        }
    }

    async edit(id, role) {
        let { name } = role;
        if (!name.trim()) throw "Name is required";

        name = name.toUpperCase().trim();

        const roleExists = await RoleModel.findOne({
            where: {
                name, id: {
                    [Op.not]: id
                }
            }
        });
        if (roleExists) throw "Role already exists";

        //* Check if role exists
        await this.getById(id);

        try {
            return RoleModel.update({ name }, { where: { id } });
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        //* Check if role exists
        await this.getById(id);

        //* Check if role is being used
        const usersWithRole = await UserModel.findOne({ where: { roleId: id } });
        if (usersWithRole) throw "Role is being used";

        try {
            return RoleModel.destroy({ where: { id } });
        } catch (err) {
            throw err;
        }
    }

}