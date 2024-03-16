import axios from 'axios';
import { ParameterizedContext } from 'koa';
import userService from '../service/user.service';

class SRSController {
  async rtcV1Publish(ctx: ParameterizedContext, next) {
    const { streamurl, sdp } = ctx.request.body;
    const srsRes = await axios.post('http://localhost:1985/rtc/v1/publish/', {
      sdp,
      streamurl,
    });
    ctx.body = srsRes.data;
    await next();
  }

  onPublish = async (ctx: ParameterizedContext, next) => {
    // https://ossrs.net/lts/zh-cn/docs/v5/doc/http-callback#nodejs-koa-example
    // code等于数字0表示成功，其他错误码代表失败。
    // @ts-ignore
    const { body }: { body: ISrsCb } = ctx.request;
    console.log(`on_publish参数`, body);

    const roomId = Number(body.stream);

    if (!roomId) {
      console.log(`[on_publish] 房间id不存在！`);
      ctx.body = { code: 1, msg: '[on_publish] fail, roomId is not exist' };
    } else {
      const params = new URLSearchParams(body.param);
      const paramsPublishKey = params.get('push_key');
      const paramsPublishUid = params.get('uid');
      console.log(params, '-');
      if (!paramsPublishKey || !paramsPublishUid) {
        console.log(`[on_publish] 推流鉴权失败`);
        ctx.body = { code: 1, msg: '[on_publish] fail, auth fail' };
      } else {
        let res = await userService.findByPush({
          id: paramsPublishUid,
          push_key: paramsPublishKey,
        });
        if (!res) {
          console.log(`[on_publish] 推流鉴权失败`);
          ctx.body = { code: 1, msg: '[on_publish] fail, auth fail' };
        } else {
          console.log(`[on_publish] 推流鉴权成功`);
          ctx.body = { code: 0, msg: '[on_publish] success' };
        }
      }
      await next();
    }
  };
}

export default new SRSController();
