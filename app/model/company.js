module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const companySchema = new Schema({
    id: { type: String },
    name: { type: String },
    deskData: { type: Object }
  });

  return mongoose.model('Company', companySchema);
}