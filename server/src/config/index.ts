import { join } from 'path';

export const config = {
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'mysql54890',
    database: 'just_doit',
    entities: [join(__dirname, '../modules/entities', '**/**.entity{.ts,.js}')],
    synchronize: true, // 初始化时是否重置数据库数据
  },
};
