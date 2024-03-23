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

const model = sequelizeInst.define<ILiveroomModel>(
  'liveroom',
  {
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

export const liveroomModel = model;
