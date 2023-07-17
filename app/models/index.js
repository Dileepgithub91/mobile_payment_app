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
db.user_roles = require("./user_roles.model")(sequelize, DataTypes);
db.user_addresses = require("./user_addresses.model")(sequelize, DataTypes);
db.user_kyc_details = require("./user_kyc_details.model")(sequelize, DataTypes);
db.user_profile = require("./user_profile.model")(sequelize, DataTypes);
db.registration_verification = require("./registration_verification.model")(sequelize, DataTypes);
db.user_token = require("./user_token.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
