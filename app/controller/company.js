const Controller = require('egg').Controller;

class SettingController extends Controller {
  async getSetting() {
    const { ctx } = this;
    const companyId = ctx.params.id;
    const deskData = await ctx.service.company.getSetting(companyId);
    ctx.body = {
      data: deskData
    };
    ctx.status = 200;
  }

  async upsertSetting() {
    const { ctx } = this;
    const companyId = ctx.params.id;
    const deskData = ctx.request.body.data;
    let result = await ctx.service.company.upsertSetting({ companyId, deskData });
    if (result === 'ok') {
      ctx.status = 204;
    } else {
      ctx.status = 500;
    }
  }
}

module.exports = SettingController;