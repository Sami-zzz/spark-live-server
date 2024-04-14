import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import { sequelizeInst } from '../config/mysql';
import { IOrder } from '../interface';

interface IOrderModel
  extends Model<
      InferAttributes<IOrderModel>,
      InferCreationAttributes<IOrderModel>
    >,
    IOrder {}

const model = sequelizeInst.define<IOrderModel>('order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  order_number: {
    type: DataTypes.STRING(50),
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  user_name: {
    type: DataTypes.STRING(10),
  },
  live_id: {
    type: DataTypes.INTEGER,
  },
  live_name: {
    type: DataTypes.STRING(10),
  },
  gift_id: {
    type: DataTypes.INTEGER,
  },
  gift_name: {
    type: DataTypes.STRING(50),
  },
  price: {
    type: DataTypes.INTEGER,
  },
  send_time: {
    type: DataTypes.STRING(100),
  },
});

export const orderModel = model;
