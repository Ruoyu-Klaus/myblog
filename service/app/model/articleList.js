// app/model/articleList.js
'use strict';

module.exports = app => {
  // egg-sequelize插件会将Sequelize类绑定到app上线，从里面可以取到各种静态类型
  const { TEXT, INTEGER, NOW, STRING } = app.Sequelize;

  const ArticleList = app.model.define(
    'article',
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: STRING, allowNull: false },
      article_content: { type: TEXT, allowNull: false },
      introduce: { type: STRING },
      add_time: {
        type: INTEGER,
        defaultValue: NOW,
      },
      view_count: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'article',
      underscored: true,
    }
  );

  // 定义关联关系
  ArticleList.associate = () => {
    // 定义一对多关联
    ArticleList.belongsTo(app.model.Type, { foreignKey: 'type_id', targetKey: 'id' });
  };

  return ArticleList;
};
