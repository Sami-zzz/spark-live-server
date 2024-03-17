import { ParameterizedContext } from 'koa';
import { IP } from '../constant';
import userService from '../service/user.service';
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
        });
        // 用户注册时，自动绑定一个流地址
        res.update({
          push_url: 'webrtc://' + IP + ':5001/stream/' + res.id,
          pull_url: 'http://' + IP + ':5001/stream/' + res.id,
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
}

export default new UserController();
