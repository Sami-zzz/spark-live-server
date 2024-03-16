import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IUser } from '../interface';

interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    IUser {}

const model = sequelizeInst.define<UserModel>(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
    },
    password: {
      type: DataTypes.STRING(20),
    },
    token: {
      type: DataTypes.STRING(500),
    },
    push_key: {
      type: DataTypes.STRING(20),
    },
    push_url: {
      type: DataTypes.STRING(100),
    },
    pull_url: {
      type: DataTypes.STRING(100),
    },
    remark: {
      type: DataTypes.STRING(100),
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

// https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5
// model.sync({ force: true });
// model.sync({ alter: true });

export const userModel = model;
