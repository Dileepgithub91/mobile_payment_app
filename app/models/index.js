const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("select_karo", "root", "testing012", {
  host: "localhost",
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

db.users = require("./user.model")(sequelize, DataTypes);
db.otp_verify = require("./verification.model")(sequelize, DataTypes);
db.jwt_token = require("./token.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
