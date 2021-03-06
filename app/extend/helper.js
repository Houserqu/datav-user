'use strict';

module.exports = {
  /**
   * 返回操作成功请求
   * @param {*} data 返回数据
   */
  resSuccess(data = null) {
    const { ctx } = this;

    ctx.status = 200;
    ctx.body = {
      success: true,
      msg: '成功',
      data,
    };
  },
  /**
   * 返回操作失败请求
   * @param {string} msg 错误信息
   * @param {*} data 返回数据
   */
  resError(msg = '', data = null) {
    const { ctx } = this;

    ctx.status = 200;
    ctx.body = {
      success: false,
      msg,
      data,
    };
  },
  /**
   * 参数校验，不传 params 默认校验请求 body
   * @param {object} rule 校验规则
   * @param {object} params 校验对象，默认为当前请求 body
   * @return {boolean} 是否通过校验
   */
  validate(rule, params = null) {
    const { ctx } = this;

    try {
      ctx.validate(rule, params || ctx.request.body);
    } catch (err) {
      ctx.helper.resError('参数校验失败', err.errors);
      return false;
    }

    return true;
  },
};
