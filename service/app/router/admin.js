module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();
  router.get('/admin/', adminauth, controller.admin.home.index);
  router.post('/admin/checkLogin', controller.admin.home.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.home.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.home.addArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.home.updateArticle);
};
