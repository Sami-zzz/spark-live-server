// WARN 全局接口

export interface IUser {
  id?: number;
  /** 用户名 */
  username?: string;
  /** 密码 */
  password?: number;
  /** token */
  token?: string;
  /** 备注 */
  remark?: string;
  /** 推流秘钥 */
  push_key?: string;
  /** 推流地址 */
  push_url?: string;
  /** 拉流地址 */
  pull_url?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
