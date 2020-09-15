'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi api';
  }
  async checkLogin() {
    const { ctx } = this;
    try {
      let userName = ctx.request.body.userName;
      let password = ctx.request.body.password;
      const sql = `SELECT uname FROM user WHERE uname = '${userName}' AND upassword = '${password}'`;
      const res = await this.app.mysql.query(sql);
      if (res.length > 0) {
        //登录成功,进行session缓存
        let openId = new Date().getTime();
        ctx.session.openId = { openId };
        ctx.body = { data: '登录成功', openId };
      } else {
        ctx.body = { data: '账号或密码有误' };
        // ctx.status = 403;
      }
    } catch (error) {
      ctx.status = 500;
      ctx.body = { data: '登陆失败' };
    }
  }
  //后台文章分类信息
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }
}

module.exports = HomeController;
