import Sequelize from 'sequelize';

import { IUserRecord } from '../interface';
import { userRecordModel } from '../model/user_record.model';

const { Op } = Sequelize;

class UserRecordService {
  async create(data: IUserRecord) {
    const result = await userRecordModel.create(data);
    return result;
  }

  async getUserRecordList({ pageNo, pageSize, keyword }) {
    const result = await userRecordModel.findAndCountAll({
      where: {
        username: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
    });
    return result;
  }
}

export default new UserRecordService();
