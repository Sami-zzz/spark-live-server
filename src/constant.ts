// WARN 全局常量

export enum PROJECT_ENV_ENUM {
  development = 'development',
  prod = 'prod',
  beta = 'beta',
}

export const IP = '192.168.0.140';

export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string;
export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM;
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string;
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string;
