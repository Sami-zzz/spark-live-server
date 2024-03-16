import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IRole } from '../interface';

interface RoleModel
  extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>>,
    IRole {}

const model = sequelizeInst.define<RoleModel>(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING(20),
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);

export const roleModel = model;
