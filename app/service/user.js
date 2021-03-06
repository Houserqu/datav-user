'use strict';

const bcrypt = require('bcryptjs');
const Service = require('egg').Service;

class UserService extends Service {
  async create(params) {
    // password 加密
    const salt = bcrypt.genSaltSync(10);
    const hashPd = bcrypt.hashSync(params.password, salt);

    const result = await this.app.mysql.insert('user', {
      ...params,
      password: hashPd,
    });

    return result;
  }

  async login(params) {
    const userInfo = await this.app.mysql.get('user', { mail: params.mail });

    if (userInfo && bcrypt.compareSync(params.password, userInfo.password)) {
      return {
        nickname: userInfo.nickname,
        mail: userInfo.mail,
      };
    }
    return null;
  }
}

module.exports = UserService;
