'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;

  app.router.get('/api/user/my-info', controller.user.curUserInfo);

  app.router.resources('user', '/api/user', controller.user);

  app.router.post('/api/login', controller.user.login);

};
