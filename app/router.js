module.exports = app => {
  const { router, controller } = app;
  router.redirect('/', '/index', 302);
  router.redirect('/spa', '/index', 302);
  router.get('/index', controller.home.index);

  router.get('/company/:id/setting', controller.company.getSetting);
  router.post('/company/setting', controller.company.upsertSetting);
  router.put('/company/:id/setting', controller.company.upsertSetting)
};