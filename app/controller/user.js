'use strict';

const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  mail: 'string',
  nickname: 'string',
  password: 'string',
};

const loginRule = {
  mail: 'string',
  password: 'string',
};

class UserController extends Controller {
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);

    const id = await ctx.service.user.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      id,
    };
    ctx.status = 201;
  }

  async login() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    if (!ctx.helper.validate(loginRule)) return;
    // 调用 service 创建一个 topic
    const userInfo = await ctx.service.user.login(ctx.request.body);
    // 设置响应体和状态码
    if (userInfo) {
      ctx.helper.resSuccess(userInfo);
    } else {
      ctx.helper.resError('账号或密码错误');
    }
  }

  async curUserInfo() {
    const { ctx: { helper, service, headers } } = this;
    const userId = headers['certificate-userid'];

    try {
      const res = await service.user.getUser(userId);
      helper.resSuccess({
        mail: res.mail,
        nickname: res.nickname,
      });
    } catch (e) {
      helper.resError(e.message);
    }
  }

  // 单个资源
  async show() {
    const { ctx: { helper, service, params } } = this;
    try {
      const res = await service.user.getUser(parseInt(params.id));
      helper.resSuccess({
        mail: res.mail,
        nickname: res.nickname,
      });
    } catch (e) {
      helper.resError(e.message);
    }
  }
}

module.exports = UserController;
