import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IPermission } from '../interface';

interface PermissionModel
  extends Model<
      InferAttributes<PermissionModel>,
      InferCreationAttributes<PermissionModel>
    >,
    IPermission {}

const model = sequelizeInst.define<PermissionModel>(
  'permission',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    permission_name: {
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

export const permissionModel = model;
