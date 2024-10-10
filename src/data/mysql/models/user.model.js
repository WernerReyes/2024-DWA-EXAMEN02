import { DataTypes, Model } from 'sequelize';

export class UserModel extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },

            dni: {
                type: DataTypes.STRING,
                allowNull: false
            },

            //* RelationShip with Role
            roleId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Role',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'User',
            timestamps: false
        });
    }


    static associate(models) {
        this.belongsTo(models.RoleModel, {
            foreignKey: 'roleId',
            as: 'role'
        });
    }
}