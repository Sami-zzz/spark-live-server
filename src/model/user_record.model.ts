import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IUserRecord } from '../interface';

interface UserRecordModel
  extends Model<
      InferAttributes<UserRecordModel>,
      InferCreationAttributes<UserRecordModel>
    >,
    IUserRecord {}

const model = sequelizeInst.define<UserRecordModel>('user_record', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING(20),
  },
  type: {
    type: DataTypes.INTEGER,
  },
  reason: {
    type: DataTypes.STRING(200),
  },
});

export const userRecordModel = model;
