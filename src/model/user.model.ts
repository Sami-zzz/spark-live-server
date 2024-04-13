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

const model = sequelizeInst.define<UserModel>('user', {
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
  address: {
    type: DataTypes.STRING(20),
  },
  email: {
    type: DataTypes.STRING(100),
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
  role_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
  },
});

export const userModel = model;
