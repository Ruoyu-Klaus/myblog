# Features

- 首页数据可视化图片
- Breadcrumbs 导航实现
- 暂存文章
- 评论管理
- 首页页码

# Refactor

- 增强组件复用，优化冗余代码
- 无状态组件需要定义 props 类
- 替换 sql 语法，使用 ORM 操作如 sequelize
- 抽象分页代码【list 和 homelist】
- 管理平台 CRUD 的 sequelize 严谨度需要加强， 需要返回成功状态码
- cros csrf 问题
- 替换并移除@egg-mysql
