import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IHistoryLive } from '../interface';

interface IHistoryLiveModel
  extends Model<
      InferAttributes<IHistoryLiveModel>,
      InferCreationAttributes<IHistoryLiveModel>
    >,
    IHistoryLive {}

const model = sequelizeInst.define<IHistoryLiveModel>('history_live', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  user_name: {
    type: DataTypes.STRING(50),
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
  end_time: {
    type: DataTypes.STRING(100),
  },
});

export const historyLiveModel = model;
