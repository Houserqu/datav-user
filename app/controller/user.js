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
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
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
    ctx.validate(loginRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const userInfo = await ctx.service.user.login(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = userInfo;
    ctx.status = userInfo ? 200 : 404;
  }

}

module.exports = UserController;
