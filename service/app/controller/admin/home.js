'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi api';
  }
  // 检查登陆 POST
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
  //后台文章分类信息 GET
  async getTypeInfo() {
    const { ctx } = this;
    const resType = await this.app.mysql.select('type');
    ctx.body = { data: resType };
  }
  //后台添加文章 POST
  async addArticle() {
    const { ctx } = this;
    let reqArticle = ctx.request.body;
    const result = await this.app.mysql.insert('article', reqArticle);
    const isSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    ctx.body = {
      isSuccess,
      insertId,
    };
  }
  //后台修改文章 POST
  async updateArticle() {
    const { ctx } = this;
    let reqArticle = ctx.request.body;
    const result = await this.app.mysql.update('article', reqArticle);
    const isSuccess = result.affectedRows === 1;
    ctx.body = {
      isSuccess,
    };
  }
}

module.exports = HomeController;
