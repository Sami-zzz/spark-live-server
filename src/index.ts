import Koa from 'koa';
import koaBody from 'koa-body';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import Router from 'koa-router';

import { connectMysql } from './config/mysql';
import { PROJECT_ENV, PROJECT_NAME, PROJECT_PORT } from './constant';
import { srsRouter } from './router/srs.router';
import { userRouter } from './router/user.router';

import { orderRouter } from './router/order.router';

const port = +PROJECT_PORT;
// https://koa.bootcss.com
const app = new Koa();
// https://github.com/ZijianHe/koa-router
const router = new Router();

app.use(koaBody()); // 解析参数
app.use(conditional()); // 接口缓存
app.use(etag()); // 接口缓存
app.listen(port);

connectMysql();

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'hello world',
  };
  await next();
});
app.use(router.routes()).use(router.allowedMethods());
app.use(srsRouter.routes()).use(srsRouter.allowedMethods());
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());

console.log(`项目启动成功！`);
console.log(`监听端口: ${port}`);
console.log(`项目名称: ${PROJECT_NAME}`);
console.log(`项目环境: ${PROJECT_ENV}`);
