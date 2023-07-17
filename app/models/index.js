const { Sequelize, DataTypes } = require("sequelize");
const env = require("../env");
const sequelize = new Sequelize(env("DB_NAME"), env("DB_USER"), env("DB_PASS"), {
  host: env("DB_HOST"),
  dialect:"mysql",
  operatorsAliases: false,
});

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
db.user_roles = require("./user.roles.model")(sequelize, DataTypes);
db.user_addresses = require("./user.addresses.model")(sequelize, DataTypes);
db.user_kyc_details = require("./user.kyc.details.model")(sequelize, DataTypes);
db.user_profile = require("./user.profile.model")(sequelize, DataTypes);
db.registration_verification = require("./registration.verification.model")(sequelize, DataTypes);
db.user_token = require("./user.token.model")(sequelize, DataTypes);
db.business_customer = require("./business.customer.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
