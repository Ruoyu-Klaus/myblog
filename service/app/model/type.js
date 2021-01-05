// app/model/type.js
'use strict';

module.exports = app => {
  // egg-sequelize插件会将Sequelize类绑定到app上线，从里面可以取到各种静态类型
  const { INTEGER, STRING } = app.Sequelize;

  const Type = app.model.define(
    'type',
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_name: { type: STRING, allowNull: false },
      type_num: { type: INTEGER },
      icon: { type: STRING },
    },
    {
      timestamps: false,
      freezeTableName: true,
      tableName: 'type',
      underscored: true,
    }
  );

  // 定义关联关系
  Type.associate = () => {
    // 定义一对多关联
    Type.hasMany(app.model.ArticleList, { foreignKey: 'type_id', targetKey: 'id' });
  };

  return Type;
};
