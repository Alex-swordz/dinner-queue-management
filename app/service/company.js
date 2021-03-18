const Service = require('egg').Service;

class CompanyService extends Service {
  async getSetting (companyId) {
    const { Company } = this.ctx.model;
    companyId = companyId||'only_companyId';
    let companyData = await Company.findOne({ id: companyId })||{};

    return companyData.deskData||{};
  }

  async upsertSetting (data) {
    const { Company } = this.ctx.model;
    let id = data.companyId||'only_companyId';
    let companyData = {
      id,
      name: data.name||'白月光',
      deskData: data.deskData
    };

    try {
      await Company.findOneAndUpdate({ id }, { $set: companyData}, { upsert: true });

      return 'ok';
    } catch (error) {
      return 'error';
    }
  }
}

module.exports = CompanyService;