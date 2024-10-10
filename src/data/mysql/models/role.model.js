import { DataTypes, Model } from "sequelize";

export class RoleModel extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            sequelize,
            modelName: 'Role',
            tableName: 'Role',
            timestamps: false
            
        });

    }

    static associate(models) {
        this.hasMany(models.UserModel, {
            foreignKey: 'roleId',
            as: 'user'
        });
    }
}