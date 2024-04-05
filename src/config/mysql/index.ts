import { Sequelize } from 'sequelize';

import { MYSQL_CONFIG } from '../secret';

export const sequelizeInst = new Sequelize({
  database: MYSQL_CONFIG.database,
  username: MYSQL_CONFIG.username,
  password: MYSQL_CONFIG.password,
  host: MYSQL_CONFIG.host,
  port: MYSQL_CONFIG.port,
  dialect: 'mysql',
  dialectOptions: {
    // 返回正确的时间戳字符串。
    dateStrings: true,
    typeCast: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: '+08:00',
  logging: false,
});

// https://www.sequelize.cn/core-concepts/getting-started
export async function connectMysql() {
  try {
    await sequelizeInst.authenticate();
    console.log('连接mysql数据库成功');
  } catch (error) {
    console.error('连接mysql数据库失败:', error);
  }
  try {
    await import('../../model/user.model');
    await import('../../model/role.model');
    await import('../../model/permission.model');
    await import('../../model/role_permission.model');
    await import('../../model/liveroom.model');
    await import('../../model/gift.model');

    // https://www.sequelize.cn/core-concepts/model-basics#%E4%B8%80%E6%AC%A1%E5%90%8C%E6%AD%A5%E6%89%80%E6%9C%89%E6%A8%A1%E5%9E%8B
    await sequelizeInst.sync({ alter: true });
    // User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
    // User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
    // User.sync({ alter: true }) - 这将检查数据库中表的当前状态

    console.log('所有模型均已成功同步');
    const queryInterface = sequelizeInst.getQueryInterface();
    const allTables = await queryInterface.showAllTables();
    console.log('所有表', allTables);
  } catch (error) {
    console.log('模型同步失败', error);
  }
}
