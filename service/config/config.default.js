/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599724532334_8495';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'password',
      // database
      database: 'react-blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  exports.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'react-blog',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
    // connectionUri: 'mysql://root:@127.0.0.1:3306/test',
  };

  config.security = {
    csrf: { enable: true, headerName: 'x-csrf-token' },
    domainWhiteList: [ 'http://127.0.0.1:3000', 'http://127.0.0.1:8000' ],
  };
  config.cors = {
    enable: 'true',
    origin: 'http://127.0.0.1:3000',
    credentials: true,
    allowMethods: 'GET,PUT,POST,DELETE,OPTIONS',
  };

  return {
    ...config,
    ...userConfig,
  };
};
