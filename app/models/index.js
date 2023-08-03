const { Sequelize, DataTypes } = require("sequelize");
const env = require("../env");
const sequelize = new Sequelize(
  env("DB_NAME"),
  env("DB_USER"),
  env("DB_PASS"),
  {
    host: env("DB_HOST"),
    dialect: "mysql",
  }
);
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

db.User = require("./users.model")(sequelize, DataTypes);
db.Country = require("./countery.model")(sequelize, DataTypes);
db.State = require("./state.model")(sequelize, DataTypes);
db.City = require("./city.model")(sequelize, DataTypes);
db.UserRoles = require("./user.roles.model")(sequelize, DataTypes);
db.UserAddress = require("./user.addresses.model")(sequelize, DataTypes);
db.UserKycDetail = require("./user.kyc.details.model")(sequelize, DataTypes);
db.UserProfile = require("./user.profile.model")(sequelize, DataTypes);
db.OtpVerification = require("./otp.verification.model")(sequelize, DataTypes);
db.UserToken = require("./user.token.model")(sequelize, DataTypes);
db.BusinessRequest = require("./business.request.model")(
  sequelize,
  DataTypes
);
db.BusinessAgreement = require("./business.agreement.model")(
  sequelize,
  DataTypes
);
db.UploadedBusinessAgreement =
  require("./company.agreement.upload.document.model")(sequelize, DataTypes);
db.KycPanDetail = require("./kyc.pan.response.model")(sequelize, DataTypes);
db.kycAadharDetail = require("./kyc.aadhar.response.model")(
  sequelize,
  DataTypes
);
db.KycGstDetail = require("./kyc.gst.response.model")(sequelize, DataTypes);
db.ApiProviderSetting = require("./api.provider.setting.model")(
  sequelize,
  DataTypes
);
db.Product = require("./product.model")(sequelize, DataTypes);
db.ProductPrice = require("./product.price.model")(sequelize, DataTypes);
db.Ticket = require("./ticket.model")(sequelize, DataTypes);
db.TicketReply = require("./ticket.reply.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
