const { Sequelize, DataTypes } = require("sequelize");
const env = require("../env");
var config=  {
  "define": {
       "underscored": true
     }
 }
const sequelize = new Sequelize(
  env("DB_NAME"),
  env("DB_USER"),
  env("DB_PASS"),
  {
    host: env("DB_HOST"),
    dialect: "mysql",
  },
  config
);
// const config = require('config');
// const dir = config.get('sqlite.logFileDir');
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
db.KycAadharDetail = require("./kyc.aadhar.response.model")(
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
db.Provider = require("./provider.model")(sequelize, DataTypes);
db.CardProviderSetting = require("./card.provider.setting.model")(sequelize, DataTypes);
db.Wallet = require("./wallets.model")(sequelize, DataTypes);
db.Transection = require("./transections.model")(sequelize, DataTypes);
db.Order = require("./order.model")(sequelize, DataTypes);
db.CardOrderDetail = require("./card.order.details.model")(sequelize, DataTypes);
db.PurchasedCard = require("./purchased.cards.model")(sequelize, DataTypes);
db.ActiveCard = require("./active.cards.model")(sequelize, DataTypes);
db.UploadedCards = require("./uploaded.cards.model")(sequelize, DataTypes);
db.UploadedCardsTemp = require("./uploaded.cards.temp.model")(sequelize, DataTypes);
db.CardFormat = require("./card.format.model")(sequelize, DataTypes);
db.SalesMarginGroup = require("./sales.margin.group.model")(sequelize, DataTypes);
db.SalesMargin = require("./sales.margin.model")(sequelize, DataTypes);
db.PurchaseMargin = require("./purchase.margin.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

///Relations Between Tables
let {
  User,UserProfile,Order,Wallet,Ticket,TicketReply,
  UserToken,ActiveCard,PurchasedCard,
  UploadedCardsTemp,UploadedCards,CardOrderDetail,
  UploadedBusinessAgreement,
  UserAddress,UserKycDetail,PurchaseMargin,CardProviderSetting,
  Product,KycAadharDetail,KycPanDetail,KycGstDetail
} =db;


// user relations with all
UserProfile.belongsTo(User,{ foreignKey: 'id' });
User.hasOne(UserProfile,{ foreignKey: 'user_id' });
//user wallet
Wallet.belongsTo(User,{ foreignKey: 'id' });
User.hasOne(Wallet,{ foreignKey: 'user_id' });

User.hasOne(UserToken,{ foreignKey: 'user_id' });
UserToken.belongsTo(User,{ foreignKey: 'id' });

User.hasOne(UserAddress,{ foreignKey: 'user_id' });
UserAddress.belongsTo(User,{ foreignKey: 'id' });

User.hasOne(UserKycDetail,{ foreignKey: 'user_id' });
UserKycDetail.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(Order,{ foreignKey: 'user_id' });
Order.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(Ticket,{ foreignKey: 'user_id' });
Ticket.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(ActiveCard,{ foreignKey: 'user_id' });
ActiveCard.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(PurchasedCard,{ foreignKey: 'user_id' });
PurchasedCard.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(UploadedCardsTemp,{ foreignKey: 'user_id' });
UploadedCardsTemp.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(UploadedCards,{ foreignKey: 'user_id' });
UploadedCards.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(CardOrderDetail,{ foreignKey: 'user_id' });
CardOrderDetail.belongsTo(User,{ foreignKey: 'id' });

User.hasMany(UploadedBusinessAgreement,{ foreignKey: 'user_id' });
UploadedBusinessAgreement.belongsTo(User,{ foreignKey: 'id' });

//Purchase margin 
PurchaseMargin.belongsTo(Product,{ foreignKey: 'id' });
Product.hasMany(PurchaseMargin,{ foreignKey: 'product_id' });

PurchaseMargin.belongsTo(CardProviderSetting,{ foreignKey: 'id' });
CardProviderSetting.hasMany(PurchaseMargin,{ foreignKey: 'provider_id' });

///userKycDetails
UserKycDetail.hasOne(KycAadharDetail,{ foreignKey: 'user_id' });
KycAadharDetail.belongsTo(UserKycDetail,{foreignKey:'user_id'});
UserKycDetail.hasOne(KycPanDetail,{ foreignKey: 'user_id' });
KycPanDetail.belongsTo(UserKycDetail,{foreignKey:'user_id'});
UserKycDetail.hasOne(KycGstDetail,{ foreignKey: 'user_id' });
KycGstDetail.belongsTo(UserKycDetail,{foreignKey:'user_id'});

//Product and cardprovider
CardProviderSetting.hasMany(Product,{foreignKey:'provider_id'});
Product.belongsTo(CardProviderSetting,{foreignKey:'id'});

//Ticket and Ticket Reply
TicketReply.belongsTo(Ticket,{foreignKey:'id'});
Ticket.hasMany(TicketReply,{foreignKey:'ticket_id'});

module.exports = db;
