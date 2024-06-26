import axios from 'axios';
import { ParameterizedContext } from 'koa';
import { IP } from '../constant';
import historyLiveService from '../service/history_live.service';
import liveroomService from '../service/liveroom.service';
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
  // 推流鉴权
  onPublish = async (ctx: ParameterizedContext, next) => {
    // https://ossrs.net/lts/zh-cn/docs/v5/doc/http-callback#nodejs-koa-example
    // code等于数字0表示成功，其他错误码代表失败。
    // @ts-ignore
    const { body }: { body: ISrsCb } = ctx.request;
    console.log(`on_publish参数`, body);
    const roomId = Number(body.stream);

    const res = await liveroomService.find(roomId);

    if (!roomId) {
      console.log(`[on_publish] 房间id不存在！`);
      ctx.body = { code: 1, msg: '[on_publish] fail, roomId is not exist' };
    } else if (res) {
      console.log(`[on_publish] 房间已存在！`);
      ctx.body = { code: 1, msg: '[on_publish] fail, room is exist!' };
    } else {
      const params = new URLSearchParams(body.param);
      const paramsPublishKey = params.get('push_key');
      const paramsPublishUid = params.get('uid');
      const paramsPublishTitle = params.get('title');
      console.log(params, '-');
      if (!paramsPublishKey || !paramsPublishUid || !paramsPublishTitle) {
        console.log(`[on_publish] 推流鉴权失败1`);
        ctx.body = { code: 1, msg: '[on_publish] fail, auth fail' };
      } else {
        let res = await userService.findByPush({
          id: paramsPublishUid,
          push_key: paramsPublishKey,
        });
        if (!res) {
          console.log(`[on_publish] 推流鉴权失败2`);
          ctx.body = { code: 1, msg: '[on_publish] fail, auth fail' };
        } else {
          console.log(`[on_publish] 推流鉴权成功`);
          ctx.body = { code: 0, msg: '[on_publish] success' };
          const userres = await userService.find(
            Number(paramsPublishUid as string)
          );
          await liveroomService.create({
            user_id: Number(paramsPublishUid),
            user_name: userres?.username!,
            title: paramsPublishTitle,
            pull_url: 'http://' + IP + ':5001/stream/' + paramsPublishUid,
            open_time: Date.now() + '',
          });

          await historyLiveService.create({
            user_id: Number(paramsPublishUid),
            user_name: userres?.username!,
            title: paramsPublishTitle,
            pull_url: 'http://' + IP + ':5001/stream/' + paramsPublishUid,
            open_time: Date.now() + '',
            end_time: '',
          });
          console.log('新增直播间');
        }
      }
      await next();
    }
  };

  unPublish = async (ctx: ParameterizedContext, next) => {
    const { body } = ctx.request;
    const roomId = Number(body.stream);
    await liveroomService.delete(roomId);
    let res = await historyLiveService.find(roomId);
    console.log(res);
    await res?.update({
      end_time: Date.now() + '',
    });
    console.log('删除直播间');
    await next();
  };

  getRoomList = async (ctx: ParameterizedContext, next) => {
    const roomlist = await liveroomService.findAllRoom();
    ctx.body = {
      code: 200,
      data: {
        list: roomlist,
      },
      msg: 'ok',
    };
    await next();
  };

  getRoom = async (ctx: ParameterizedContext, next) => {
    const { body } = ctx.request;
    const user_id = Number(body.user_id);
    const room = await liveroomService.find(user_id);
    ctx.body = {
      code: 200,
      data: room,
      msg: 'ok',
    };
    await next();
  };

  async getLiveroomList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize, keyword } = ctx.request.body;
    const res = await liveroomService.getLiveroomList({
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

  async getHistoryLiveList(ctx: ParameterizedContext, next) {
    const { pageNo, pageSize, keyword } = ctx.request.body;
    const res = await historyLiveService.getHistoryLiveList({
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
}

export default new SRSController();
