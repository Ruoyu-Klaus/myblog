module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth();
  router.get('/admin/', adminauth, controller.admin.home.index);
  router.post('/admin/checkLogin', controller.admin.home.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.home.getTypeInfo);
};
