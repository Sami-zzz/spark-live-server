import { ParameterizedContext } from 'koa';
import giftService from '../service/gift.service';
import orderService from '../service/order.service';
import userService from '../service/user.service';

class orderController {
  async newOrder(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    const user_id = body.user_id;

    const live_id = body.live_id;
    const gift_id = body.gift_id;
    const gift_name = body.gift_name;
    const price = body.price;
    const userres = await userService.find(Number(user_id as string));
    const user_name = userres!.username;
    const liveres = await userService.find(Number(live_id as string));
    const live_name = liveres!.username;
    const send_time = Math.floor(Date.now() / 1000) + '';
    const order_number = send_time + user_id + live_id;
    let res = await orderService.create({
      order_number,
      user_id,
      user_name,
      live_id,
      live_name,
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

  // 管理员
  async getGiftList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize } = ctx.request.body;
    const res = await giftService.getGiftList({
      pageNo,
      pageSize,
    });
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '失败',
      };
    }
    await next();
  }

  async getOrderList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize, user_name, live_name } = ctx.request.body;
    const res = await orderService.getOrderList({
      pageNo,
      pageSize,
      user_name,
      live_name,
    });
    if (res) {
      ctx.body = {
        code: 200,
        data: res,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '失败',
      };
    }
    await next();
  }
}

export default new orderController();
