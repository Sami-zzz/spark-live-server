import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IRolePermission } from '../interface';
import { permissionModel } from './permission.model';
import { roleModel } from './role.model';
interface IRolePermissionModel
  extends Model<
      InferAttributes<IRolePermissionModel>,
      InferCreationAttributes<IRolePermissionModel>
    >,
    IRolePermission {}

const model = sequelizeInst.define<IRolePermissionModel>('role_permission', {
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: roleModel,
      key: 'id',
    },
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: permissionModel,
      key: 'id',
    },
  },
});

roleModel.belongsToMany(permissionModel, { through: model });
permissionModel.belongsToMany(roleModel, { through: model });
export const rolepermissionModel = model;
