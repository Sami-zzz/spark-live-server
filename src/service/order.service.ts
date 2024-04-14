import Sequelize from 'sequelize';
import { IOrder } from '../interface';
import { orderModel } from '../model/order.model';

const { Op } = Sequelize;
class orderService {
  /** 新增订单 */
  async create(data: IOrder) {
    const result = await orderModel.create(data);
    return result;
  }

  /** 获得全部订单 */
  async findAllOrder() {
    const results = await orderModel.findAll();
    return results;
  }

  /** 查找用户送礼 */
  async findByUserId({ user_id }) {
    const results = await orderModel.findAll({
      where: { user_id },
    });
    return results;
  }
  /** 查找主播收礼 */
  async findByLiveId({ live_id }) {
    const results = await orderModel.findAll({
      where: { live_id },
    });
    return results;
  }

  async getOrderList({ pageNo, pageSize, user_name, live_name }) {
    const result = await orderModel.findAndCountAll({
      where: {
        user_name: {
          [Op.like]: '%' + user_name + '%',
        },
        live_name: {
          [Op.like]: '%' + live_name + '%',
        },
      },

      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
    });
    return result;
  }
}

export default new orderService();
