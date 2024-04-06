import { ParameterizedContext } from 'koa';
import orderService from '../service/order.service';

class orderController {
  async newOrder(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    const user_id = body.user_id;
    const live_id = body.live_id;
    const gift_id = body.gift_id;
    const gift_name = body.gift_name;
    const price = body.price;
    const send_time = Math.floor(Date.now() / 1000) + '';
    const order_number = send_time + user_id + live_id;
    let res = await orderService.create({
      order_number,
      user_id,
      live_id,
      gift_id,
      gift_name,
      price,
      send_time,
    });

    if (res) {
      ctx.body = {
        code: 200,
        msg: 'ok',
      };
    } else {
      ctx.body = {
        code: 400,
        msg: 'error',
      };
    }
    await next();
  }

  async getOrderByUser(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    const user_id = body.user_id;
    const res = await orderService.findByUserId({ user_id });
    if (res) {
      ctx.body = {
        code: 200,
        data: {
          list: res,
        },
        msg: 'ok',
      };
    } else {
      ctx.body = {
        code: 400,
        msg: 'error',
      };
    }
    await next();
  }

  async getOrderByLive(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    const live_id = body.live_id;
    const res = await orderService.findByLiveId({ live_id });
    if (res) {
      ctx.body = {
        code: 200,
        data: {
          list: res,
        },
        msg: 'ok',
      };
    } else {
      ctx.body = {
        code: 400,
        msg: 'error',
      };
    }
    await next();
  }
}

export default new orderController();
