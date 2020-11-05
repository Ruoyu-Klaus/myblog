'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi api';
  }
  async getArticleList() {
    const { ctx } = this;
    const results = await ctx.model.ArticleList.findAll({
      order: [['add_time', 'DESC']],
      include: [{ model: ctx.model.Type, as: 'type' }],
    });
    // let sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    //   'article.view_count as view_count ,' +
    //   'type.typeName as typeName ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id';
    // const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    };
  }
  async getArticleById() {
    // [获取详细文章内容]
    //先配置路由的动态传值，然后再接收值
    const { ctx } = this;

    let id = ctx.params.id;
    // let sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   'article.article_content as article_content,' +
    //   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
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
    this.ctx.body = { data: result };
  }
  // 获取类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

  // 获取类别内容
  async getListById() {
    // [获取各类文章列表]
    const { ctx } = this;
    let id = ctx.params.id;

    // let sql =
    //   'SELECT article.id as id,' +
    //   'article.title as title,' +
    //   'article.introduce as introduce,' +
    //   "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time," +
    //   'article.view_count as view_count ,' +
    //   'type.type_name as type_name ' +
    //   'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //   'WHERE type_id=' +
    //   id;
    // const result = await this.app.mysql.query(sql);

    const result = await ctx.model.ArticleList.findAll({
      where: { type_id: id },
      include: [{ model: ctx.model.Type, as: 'type' }],
    });

    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
