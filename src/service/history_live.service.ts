import Sequelize from 'sequelize';
import { IHistoryLive } from 'src/interface';
import { historyLiveModel } from '../model/history_live.model';
const { Op } = Sequelize;

class historyService {
  async create(data: IHistoryLive) {
    const result = await historyLiveModel.create(data);
    return result;
  }

  async find(user_id: number) {
    const result = await historyLiveModel.findOne({
      where: {
        user_id,
        end_time: '',
      },
    });
    return result;
  }

  async update(data) {
    const id = data.id;
    const args = { ...data };
    delete args.id;
    const result = await historyLiveModel.update(args, { where: { id } });
    return result;
  }

  async getHistoryLiveList({ pageNo, pageSize, keyword }) {
    const result = await historyLiveModel.findAndCountAll({
      where: {
        user_name: {
          [Op.like]: '%' + keyword + '%',
        },
        end_time: {
          [Op.ne]: '',
        },
      },
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
    });
    return result;
  }
}

export default new historyService();
