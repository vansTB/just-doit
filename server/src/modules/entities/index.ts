/* 该写法是自动扫描目录下的实体类 */
import requireAll = require('require-all');

const ENTITY = []; // , SERVICE = [], CONTROLLER = []
requireAll({
  dirname: __dirname,
  filter: /(.+entity)\.js$/,
  // filter: process.env.NODE_ENV === 'production' ? /(.+entity)\.js$/ : /(.+entity)\.ts$/,
  resolve(res) {
    for (const key in res) {
      if (res.hasOwnProperty(key) && key !== 'CommonEntity')
        ENTITY.push(res[key]);
    }
  },
});
console.log(__dirname, '__dirname');
export { ENTITY };
// export default ENTITY;
