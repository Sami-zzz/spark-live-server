// WARN 全局接口

export interface IUser {
  id?: number;
  /** 用户名 */
  username?: string;
  /** 密码 */
  password?: number;
  address?: string;
  email?: string;
  /** token */
  token?: string;

  /** 角色 */
  role_id?: number;
  /** 状态 */
  status?: number;

  /** 推流秘钥 */
  push_key?: string;
  /** 推流地址 */
  push_url?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IRole {
  id?: number;
  role_name?: string;
}

export interface IPermission {
  id?: number;
  permission_name?: string;
}

export interface IRolePermission {
  roleId?: number;
  permissionId?: number;
}

export interface ILiveroom {
  id?: number;
  user_id?: number;
  user_name: string;
  title?: string;
  pull_url?: string;
  open_time?: string;
}

export interface IHistoryLive {
  id?: number;
  user_id?: number;
  user_name: string;
  title?: string;
  pull_url?: string;
  open_time?: string;
  end_time?: string;
}

export interface IGift {
  id?: number;
  gift_name?: string;
  price?: number;
  info?: string;
}

export interface IOrder {
  id?: number;
  order_number?: string;
  user_id?: number;
  user_name?: string;
  live_id?: number;
  live_name?: string;
  gift_id?: number;
  gift_name?: string;
  price?: number;
  send_time?: string;
}

export interface IUserRecord {
  id?: number;
  user_id?: number;
  username?: string;
  type?: number;
  reason?: string;
}
