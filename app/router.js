'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller } = app;

  app.router.resources('user', '/api/v1/user', controller.user);

  app.router.post('/login', controller.user.login);
};
