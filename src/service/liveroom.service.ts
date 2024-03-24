import { ILiveroom } from 'src/interface';
import { liveroomModel } from '../model/liveroom.model';

class liveroomService {
  /** 新增直播间 */
  async create(data: ILiveroom) {
    const result = await liveroomModel.create(data);
    return result;
  }

  /** 删除直播间 */
  async delete(user_id: number) {
    const result = await liveroomModel.destroy({
      where: { user_id },
    });
    return result;
  }

  /** 查找直播间是否存在 */
  async find(user_id: number) {
    const result = await liveroomModel.findOne({
      where: { user_id },
    });
    return result;
  }

  /** 获得全部直播间 */
  async findAllRoom() {
    const results = await liveroomModel.findAll({
      attributes: ['user_id', 'pull_url', 'title', 'open_time'],
    });
    return results;
  }
}

export default new liveroomService();
