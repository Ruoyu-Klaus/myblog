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
    const results = await ctx.model.Type.findAll();
    // const results = await this.app.mysql.select('type');
    ctx.body = { data: results };
  }
  //后台添加文章 POST
  async addArticle() {
    const { ctx } = this;
    let reqArticle = ctx.request.body;

    const result = await ctx.model.ArticleList.create(reqArticle);

    // const result = await this.app.mysql.insert('article', reqArticle);
    // const isSuccess = result.affectedRows === 1;
    // const insertId = result.insertId;

    const isSuccess = !isNaN(Number(result.id));
    const insertId = result.id;
    ctx.body = {
      isSuccess,
      insertId,
    };
  }
  //后台修改文章 POST
  async updateArticle() {
    const { ctx } = this;
    let reqArticle = ctx.request.body;

    const result = await ctx.model.ArticleList.update(reqArticle, { where: { id: reqArticle.id } });
    // const result = await this.app.mysql.update('article', reqArticle);
    const isSuccess = !isNaN(Number(result.id));

    ctx.body = {
      isSuccess,
    };
  }
  //后台获取文章 GET
  async getArticleList() {
    const { ctx } = this;
    // let sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    //   'article.view_count as view_count ,' +
    //   'type.typeName as typeName ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id ORDER BY article.id DESC';

    // const results = await this.app.mysql.query(sql);

    const results = await ctx.model.ArticleList.findAll({
      order: [['add_time', 'DESC']],
      include: [{ model: ctx.model.Type, as: 'type' }],
    });
    ctx.body = {
      data: results,
    };
  }

  //后台通过ID删除文章 DELETE
  async deleteArticleById() {
    const { ctx } = this;
    let id = ctx.params.id;
    const res = await ctx.model.ArticleList.destroy({ where: { id } });
    // const res = await this.app.mysql.delete('article', { id });
    ctx.body = {
      data: res,
    };
  }

  //后台通过ID得到文章 GET
  async getArticleById() {
    const { ctx } = this;
    let id = ctx.params.id;
    // let sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   'article.article_content as article_content,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    //   'article.view_count as view_count ,' +
    //   'type.typeName as typeName ,' +
    //   'type.id as typeId ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //   'WHERE article.id=' +
    //   id;
    // const result = await this.app.mysql.query(sql);

    const result = await ctx.model.ArticleList.findAll({
      where: { id: id },
      include: [{ model: ctx.model.Type, as: 'type' }],
    });

    ctx.body = { data: result };
  }
}

module.exports = HomeController;
