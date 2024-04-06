import { IOrder } from '../interface';
import { orderModel } from '../model/order.model';

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
}

export default new orderService();
