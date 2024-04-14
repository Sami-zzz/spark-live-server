import { giftModel } from '../model/gift.model';

class giftService {
  async getGiftList({ pageNo, pageSize }) {
    const result = await giftModel.findAndCountAll({
      offset: (pageNo - 1) * pageSize,
      limit: pageSize,
    });
    return result;
  }
}

export default new giftService();
