import Sequelize from 'sequelize';

import { IUser } from '../interface';
import { userModel } from '../model/user.model';

const { Op } = Sequelize;

class UserService {
  /** 用户是否存在 */
  async isExist(ids: number[]) {
    const res = await userModel.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return res === ids.length;
  }

  /** 查找用户 */
  async getUserInfo(id: number) {
    const result = await userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['token', 'password'],
      },
    });
    return result;
  }

  /** 查找用户 */
  async find(id: number) {
    const result = await userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['token', 'push_key', 'password'],
      },
    });
    return result;
  }

  /** 查找用户 */
  async findByPush({ id, push_key }) {
    const result = await userModel.findOne({
      where: { id, push_key },
      attributes: {
        exclude: ['token', 'push_key', 'password'],
      },
    });
    return result;
  }

  async login({ username, password }) {
    const result = await userModel.findOne({
      where: { username, password },
      attributes: {
        exclude: ['token', 'password'],
      },
    });
    return result;
  }

  /** 修改用户 */
  async update(data: IUser) {
    const id = data.id;
    const args = { ...data };
    delete args.id;
    const result = await userModel.update(args, { where: { id } });
    return result;
  }

  /** 创建用户 */
  async create(data: IUser) {
    const result = await userModel.create(data);
    return result;
  }

  /** 查找用户 */
  async findByUsername(username: IUser['username']) {
    const result = await userModel.findOne({
      where: { username },
      attributes: {
        exclude: ['token', 'push_key', 'password'],
      },
    });
    return result;
  }

  /** 删除用户 */
  async delete(id: number) {
    const result = await userModel.destroy({
      where: { id },
    });
    return result;
  }
}

export default new UserService();
