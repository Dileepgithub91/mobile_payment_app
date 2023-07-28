const { Sequelize, DataTypes } = require("sequelize");
const env = require("../env");
console.log(env("DB_NAME"), env("DB_USER"), env("DB_PASS"),env("DB_HOST"));
const sequelize = new Sequelize(env("DB_NAME"), env("DB_USER"), env("DB_PASS"), {
  host: env("DB_HOST"),
  dialect:"mysql",
  operatorsAliases: false,
});
// const config = require('config');
// const dir = config.get('sqlite.logFileDir');
// console.log(dir);
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//   storage:dir, // 'C:\Users\Kanhaiya\Documents\SqliteDatabase\sqlite-tools-win32-x86-3420000.select_karo',
// });

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(`Error ${err}`);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model")(sequelize, DataTypes);
db.Country = require("./countery.model")(sequelize, DataTypes);
db.State = require("./state.model")(sequelize, DataTypes);
db.City = require("./city.model")(sequelize, DataTypes);
db.user_roles = require("./user.roles.model")(sequelize, DataTypes);
db.user_addresses = require("./user.addresses.model")(sequelize, DataTypes);
db.user_kyc_details = require("./user.kyc.details.model")(sequelize, DataTypes);
db.user_profile = require("./user.profile.model")(sequelize, DataTypes);
db.otp_verification = require("./otp.verification.model")(sequelize, DataTypes);
db.user_token = require("./user.token.model")(sequelize, DataTypes);
db.business_customer = require("./business.customer.model")(sequelize, DataTypes);
db.business_agreement = require("./business.agreement.model")(sequelize, DataTypes);
db.company_agreement_uploaded_document = require("./company.agreement.upload.document.model")(sequelize, DataTypes);
db.kyc_pan_detail = require("./kyc.pan.response.model")(sequelize, DataTypes);
db.kyc_aadhar_detail = require("./kyc.aadhar.response.model")(sequelize, DataTypes);
db.kyc_gst_detail = require("./kyc.gst.response.model")(sequelize, DataTypes);
db.api_provider_setting = require("./api.provider.setting.model")(sequelize, DataTypes);
// db.giftcard_category = require("./giftcard.category.model")(sequelize, DataTypes);
// db.giftcard_products = require("./giftcard.product.model")(sequelize, DataTypes);
// db.giftcard_orders = require("./giftcard.orders.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
