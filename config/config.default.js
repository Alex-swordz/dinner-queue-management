const path = require('path');
const fs = require('fs');
const secretKey = 'alex-example';
module.exports = app => {
  const exports = {};

  //exports.siteFile = {
  //   '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  // };

  exports.static = {
    prefix: '/static/',
    dir: path.join(app.baseDir, 'app/static')
  };
  exports.view = {
    // 如果还有其他模板引擎，需要合并多个目录
    root: [ 
      path.join(app.baseDir, 'app/assets'),
      path.join(app.baseDir, 'app/static/dist')
    ].join(',')
  };

  exports.keys = secretKey;
  //添加获取数据时的分页信息配置
  exports.paging = { page: 1, size: 20 };

  exports.middleware = [];
  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  };

  //mongodb配置
  exports.mongoose = {
    url: 'mongodb://127.0.0.1/example',
    options: {},
    plugins: [],
  };

  //csrf配置
  exports.security= {
    csrf : {
      headerName: 'x-csrf-token',// 自定义请求头
    }
 }

  return exports;
};
