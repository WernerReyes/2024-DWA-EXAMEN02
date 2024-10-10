import { Op } from "sequelize";
import { UserModel, RoleModel } from "../../data/index.js";

export class UserService {
    constructor() { }

    async getAll() {
        try {
            const [users, roles] = await Promise.all([
                await UserModel.findAll({
                    include: { all: true }
                }),
                RoleModel.findAll({ raw: true })
            ]);
            return [users.map(user => user.toJSON()), roles];
        } catch (err) {
            throw err;
        }
    }

    async getById(id) {
        try {
            const user = await UserModel.findOne({ where: { id } });
            if (!user) throw "User not found";
        }
        catch (err) {
            throw err;
        }
    }

    async add(user) {
        const { firstname, lastname, email, password, phone, dni, roleId } = user;
        if ([firstname, lastname, email, password, phone, dni, roleId].some(field => !field || field && !field.trim())) throw "All fields are required";


        const userExists = await UserModel.findOne({ where: { email } });
        if (userExists) throw "User already exists";

        try {
            return UserModel.create({
                firstname, lastname, email, password, phone, dni,
                roleId: Number(roleId)
            });
        } catch (err) {
            throw err;
        }
    }

    async edit(id, user) {
        const { firstname, lastname, email, password, phone, dni, roleId } = user;
        if ([firstname, lastname, email, password, phone, dni, roleId].some(field => !field || field && !field.trim())) throw "All fields are required";

        const userExists = await UserModel.findOne({
            where: {
                email, id: {
                    [Op.not]: id
                }
            }
        });
        if (userExists) throw "User already exists";

        //* Check if user exists
        await this.getById(id);

        try {
            return UserModel.update({ firstname, lastname, email, password, phone, dni, roleId: Number(roleId) }, { where: { id: Number(id) } });
        } catch (err) {
            throw err;
        }
    }

    async delete(id) {
        //* Check if user exists
        await this.getById(id);

        try {
            return UserModel.destroy({ where: { id: Number(id) } });
        } catch (err) {
            throw err;
        }
    }
}