import { ParameterizedContext } from 'koa';
import { IP } from '../constant';
import historyLiveService from '../service/history_live.service';
import liveroomService from '../service/liveroom.service';
import orderService from '../service/order.service';
import userService from '../service/user.service';
import userRecordService from '../service/user_record.service';
import { jwtVerify, signJwt } from '../utils/jwt';

class UserController {
  // 获取用户信息
  async getUserInfo(ctx: ParameterizedContext, next) {
    const { token } = ctx.request.body;
    if (!token) {
      ctx.body = {
        code: 400,
        msg: '同名了',
      };
    } else {
      const { code, userInfo } = await jwtVerify(token);
      if (code !== 200) {
        ctx.body = {
          code: 400,
          msg: '鉴权失败',
        };
      } else {
        let res = await userService.find(userInfo?.id!);
        if (!res) {
          ctx.body = {
            code: 400,
            msg: '用户不存在',
          };
        } else {
          ctx.body = {
            code: 200,
            data: userInfo,
          };
        }
      }
    }

    await next();
  }

  async find(ctx: ParameterizedContext, next) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = {
        code: 400,
      };
    } else {
      let res = await userService.find(Number(id as string));
      if (res) {
        ctx.body = {
          code: 200,
          data: res,
        };
      } else {
        ctx.body = {
          code: 400,
        };
      }
    }

    await next();
  }

  async updatePassword(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;
    const id = body.id;
    const userName = body.userName;
    const password = body.password;
    const newPassword = body.newPassword;
    let res = await userService.find(Number(id as string));
    if (!res || res.username != userName) {
      ctx.body = {
        code: 400,
        msg: '用户不存在',
      };
    } else {
      if (password != res.password) {
        ctx.body = {
          code: 401,
          msg: '密码不正确',
        };
      } else {
        res.update({
          password: newPassword,
        });
        ctx.body = {
          code: 200,
          msg: 'ok',
        };
      }
    }
    await next();
  }

  // 用户登录
  async login(ctx: ParameterizedContext, next) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 400,
      };
    } else {
      let res = await userService.login({ username, password });
      if (res) {
        let token = signJwt({ userInfo: res, exp: 24 });
        await userService.update({ id: res.id, token });
        ctx.body = {
          code: 200,
          token,
        };
      } else {
        ctx.body = {
          code: 400,
        };
      }
    }

    await next();
  }

  // 用户注册
  async register(ctx: ParameterizedContext, next) {
    const { body } = ctx.request;

    try {
      const flag = await userService.findByUsername(body.username);
      if (flag) {
        ctx.body = {
          code: 400,
          msg: '同名了',
        };
      } else {
        let res = await userService.create({
          username: body.username,
          password: body.password,
          push_key: Math.random().toString().slice(2, 8),
          status: 1,
          role_id: 2,
          address: body.address,
          email: body.email,
        });
        // 用户注册时，自动绑定一个流地址
        res.update({
          push_url: 'webrtc://' + IP + ':5001/stream/' + res.id,
        });
        ctx.body = {
          code: 200,
          msg: 'ok',
        };
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 400,
        error,
      };
    }
    await next();
  }

  /** 管理员 */

  // 管理员登录
  async loginAdmin(ctx: ParameterizedContext, next) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.body = {
        code: 400,
      };
    } else {
      let res = await userService.login({ username, password });
      if (res?.role_id === 1) {
        let token = signJwt({ userInfo: res, exp: 24 });
        await userService.update({ id: res.id, token });
        ctx.body = {
          code: 200,
          token,
        };
      } else {
        ctx.body = {
          code: 400,
        };
      }
    }

    await next();
  }

  // 获取所有用户
  async getUserList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize, keyword } = ctx.request.body;
    const res = await userService.getUserList({
      pageNo,
      pageSize,
      keyword,
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

  // 重置密码
  async resetPassword(ctx: ParameterizedContext, next) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '失败',
      };
    } else {
      let res = await userService.find(Number(id as string));
      if (res) {
        res.update({
          password: 123456,
        });
        ctx.body = {
          code: 200,
          msg: '成功',
        };
      } else {
        ctx.body = {
          code: 400,
          msg: '失败',
        };
      }
    }
    await next();
  }

  async deleteUser(ctx: ParameterizedContext, next) {
    const { id } = ctx.params;
    if (!id) {
      ctx.body = {
        code: 400,
        msg: '失败',
      };
    } else {
      let res = await userService.delete(Number(id as string));
      if (res) {
        ctx.body = {
          code: 200,
          msg: '成功',
        };
      } else {
        ctx.body = {
          code: 400,
          msg: '失败',
        };
      }
    }
    await next();
  }

  async handleUser(ctx: ParameterizedContext, next) {
    const { user_id, username, type, reason } = ctx.request.body;
    let res = await userService.find(Number(user_id as string));
    if (!res) {
      ctx.body = {
        code: 400,
        msg: '用户不存在',
      };
    } else {
      await res.update({
        status: type,
      });
      await userRecordService.create({
        user_id,
        username,
        type,
        reason,
      });
      ctx.body = {
        code: 200,
        msg: 'ok',
      };
    }
    await next();
  }

  async getUserRecordList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize, keyword } = ctx.request.body;
    const res = await userRecordService.getUserRecordList({
      pageNo,
      pageSize,
      keyword,
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

  async getCount(ctx: ParameterizedContext, next) {
    const userCount = await userService.getUserCount();
    const historyCount = await historyLiveService.getHistoryCount();
    const liveCount = await liveroomService.getLiveCount();
    const orderCount = await orderService.getOrderCount();
    ctx.body = {
      code: 200,
      res: [userCount, historyCount, liveCount, orderCount],
      msg: 'ok',
    };

    await next();
  }

  async getGroup(ctx: ParameterizedContext, next) {
    const res = await userService.getUserGroup();

    ctx.body = {
      code: 200,
      res: res,
      msg: 'ok',
    };
    await next();
  }
}

export default new UserController();
