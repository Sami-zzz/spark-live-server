import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { ILiveroom } from '../interface';

interface ILiveroomModel
  extends Model<
      InferAttributes<ILiveroomModel>,
      InferCreationAttributes<ILiveroomModel>
    >,
    ILiveroom {}

const model = sequelizeInst.define<ILiveroomModel>('liveroom', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING(50),
  },
  pull_url: {
    type: DataTypes.STRING(100),
  },
  open_time: {
    type: DataTypes.STRING(100),
  },
});

export const liveroomModel = model;
