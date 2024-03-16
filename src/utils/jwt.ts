import jwt from 'jsonwebtoken';
import { IUser } from '../interface';

const JWT_SECRET = 'aaaa';

/**
 * 验证jwt
 */
export const jwtVerify = (token: string) => {
  return new Promise<{
    code: number;
    userInfo?: IUser;
  }>((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      // 判断非法/过期token
      if (err) {
        resolve({ code: 400 });
        return;
      }
      resolve({ code: 200, userInfo: decoded.userInfo });
    });
  });
};

/**
 * 生成jwt
 * exp，过期时间，单位小时
 */
export const signJwt = (value: { userInfo: any; exp: number }): string => {
  const res = jwt.sign(
    { ...value, exp: Math.floor(Date.now() / 1000) + 60 * 60 * value.exp },
    JWT_SECRET
  );
  return res;
};
