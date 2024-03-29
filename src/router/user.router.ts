import Router from 'koa-router';

import userController from '../controller/user.controller';

export const userRouter = new Router({ prefix: '/user' });

userRouter.post('/get_user_info', userController.getUserInfo);

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.get('/find/:id', userController.find);
