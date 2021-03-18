const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    await this.ctx.render('layout/app');
  }
}

module.exports = HomeController;