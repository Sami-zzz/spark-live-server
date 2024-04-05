import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IGift } from '../interface';

interface IGiftModel
  extends Model<
      InferAttributes<IGiftModel>,
      InferCreationAttributes<IGiftModel>
    >,
    IGift {}

const model = sequelizeInst.define<IGiftModel>('gift', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  gift_name: {
    type: DataTypes.STRING(50),
  },
  price: {
    type: DataTypes.INTEGER,
  },
  info: {
    type: DataTypes.STRING(50),
  },
});

export const giftModel = model;
