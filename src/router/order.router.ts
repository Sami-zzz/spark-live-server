import Router from 'koa-router';

import orderController from '../controller/order.controller';

export const orderRouter = new Router({ prefix: '/order' });

orderRouter.post('/new_order', orderController.newOrder);

orderRouter.post('/get_send_order', orderController.getOrderByUser);

orderRouter.post('/get_my_order', orderController.getOrderByLive);

orderRouter.post('/getgiftlist_admin', orderController.getGiftList);

orderRouter.post('/getorderlist_admin', orderController.getOrderList);
