import Router from 'koa-router';

import srsController from '../controller/srs.controller';

export const srsRouter = new Router({ prefix: '/srs' });

srsRouter.post('/rtcV1Publish', srsController.rtcV1Publish);

srsRouter.post('/on_publish', srsController.onPublish);

srsRouter.post('/on_unpublish', srsController.unPublish);

srsRouter.get('/getroomlist', srsController.getRoomList);

srsRouter.post('/getroom', srsController.getRoom);

srsRouter.post('/getliveroom_admin', srsController.getLiveroomList);

srsRouter.post('/gethistorylive_admin', srsController.getHistoryLiveList);
