import Router from 'koa-router';

import userController from '../controller/user.controller';

export const userRouter = new Router({ prefix: '/user' });

userRouter.post('/get_user_info', userController.getUserInfo);

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.post('/update_password', userController.updatePassword);

userRouter.get('/find/:id', userController.find);

userRouter.post('/login_admin', userController.loginAdmin);

userRouter.post('/getuserlist_admin', userController.getUserList);

userRouter.get('/reset_pwd_admin/:id', userController.resetPassword);

userRouter.get('/delete_admin/:id', userController.deleteUser);

userRouter.post('/change_user_admin', userController.handleUser);

userRouter.post('/getuserrecordlist_admin', userController.getUserRecordList);

userRouter.get('/count', userController.getCount);

userRouter.get('/group', userController.getGroup);
