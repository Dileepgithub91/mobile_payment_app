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
db.SubCategory = require("./subcategory.model")(sequelize, DataTypes);
db.Category = require("./category.model")(sequelize, DataTypes);
db.BusinessRequest = require("./business.request.model")(sequelize, DataTypes);
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
db.CardProviderSetting = require("./card.provider.setting.model")(
  sequelize,
  DataTypes
);
db.Wallet = require("./wallets.model")(sequelize, DataTypes);
db.Transection = require("./transections.model")(sequelize, DataTypes);
db.Order = require("./order.model")(sequelize, DataTypes);
db.OrderItem = require("./order.item.model")(sequelize, DataTypes);
db.CardOrderDetail = require("./card.order.details.model")(
  sequelize,
  DataTypes
);
db.PurchasedCard = require("./purchased.cards.model")(sequelize, DataTypes);
db.ActiveCard = require("./active.cards.model")(sequelize, DataTypes);
db.UploadedCards = require("./uploaded.cards.model")(sequelize, DataTypes);
db.UploadedCardsTemp = require("./uploaded.cards.temp.model")(
  sequelize,
  DataTypes
);
db.CardFormat = require("./card.format.model")(sequelize, DataTypes);
db.SalesMarginGroup = require("./sales.margin.group.model")(
  sequelize,
  DataTypes
);
db.SalesMargin = require("./sales.margin.model")(sequelize, DataTypes);
db.PurchaseMargin = require("./purchase.margin.model")(sequelize, DataTypes);
db.TaxSetting = require("./tax.setting.model")(sequelize, DataTypes);
db.TaxSettingVersion = require("./tax.setting.versions.model")(sequelize, DataTypes);
db.TaxSettingHistory = require("./tax.setting.history.model")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

///Relations Between Tables
let {
  User,UserProfile,Order,Wallet,Ticket, TicketReply,
  UserToken,ActiveCard,PurchasedCard,UploadedBusinessAgreement,
  UploadedCardsTemp,CardOrderDetail,UserAddress, UserKycDetail, 
  PurchaseMargin, CardProviderSetting, Product, KycPanDetail, KycAadharDetail,
  UploadedCards,KycGstDetail,Provider,TaxSetting,TaxSettingVersion,
  OrderItem,
} = db;

// user relations with all
UserProfile.belongsTo(User, { foreignKey: "id" , constraints: false });
User.hasOne(UserProfile, { foreignKey: "user_id" , constraints: false });
//user wallet
Wallet.belongsTo(User, { foreignKey: "id" , constraints: false });
User.hasOne(Wallet, { foreignKey: "user_id" , constraints: false });

User.hasOne(UserToken, { foreignKey: "user_id", constraints: false  });
UserToken.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasOne(UserAddress, { foreignKey: "user_id", constraints: false  });
UserAddress.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasOne(UserKycDetail, { foreignKey: "user_id" , constraints: false });
UserKycDetail.belongsTo(User, { foreignKey: "id", constraints: false  });

User.hasMany(Order, { foreignKey: "user_id" , constraints: false });
Order.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(Ticket, { foreignKey: "user_id", constraints: false  });
Ticket.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(ActiveCard, { foreignKey: "user_id" , constraints: false });
ActiveCard.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(PurchasedCard, { foreignKey: "user_id" , constraints: false });
PurchasedCard.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(UploadedCardsTemp, { foreignKey: "user_id" , constraints: false });
UploadedCardsTemp.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(UploadedCards, { foreignKey: "user_id" , constraints: false });
UploadedCards.belongsTo(User, { foreignKey: "id" , constraints: false });

User.hasMany(CardOrderDetail, { foreignKey: "user_id" , constraints: false });
CardOrderDetail.belongsTo(User, { foreignKey: "id", constraints: false  });

User.hasMany(UploadedBusinessAgreement, { foreignKey: "user_id" , constraints: false });
UploadedBusinessAgreement.belongsTo(User, { foreignKey: "id" , constraints: false });

//Purchase margin
PurchaseMargin.belongsTo(Product, { foreignKey: "id", constraints: false  });
Product.hasMany(PurchaseMargin, { foreignKey: "product_id", constraints: false  });

PurchaseMargin.belongsTo(CardProviderSetting, { foreignKey: "id" , constraints: false });
CardProviderSetting.hasMany(PurchaseMargin, { foreignKey: "provider_id" , constraints: false });

///userKycDetails
UserKycDetail.hasOne(KycAadharDetail, { foreignKey: "user_id", constraints: false  });
KycAadharDetail.belongsTo(UserKycDetail, { foreignKey: "user_id" , constraints: false });
UserKycDetail.hasOne(KycPanDetail, { foreignKey: "user_id" , constraints: false });
KycPanDetail.belongsTo(UserKycDetail, { foreignKey: "user_id" , constraints: false });
UserKycDetail.hasOne(KycGstDetail, { foreignKey: "user_id" , constraints: false });
KycGstDetail.belongsTo(UserKycDetail, { foreignKey: "user_id" , constraints: false });

//Product and cardprovider
CardProviderSetting.belongsTo(Product, { foreignKey: "id" , constraints: false });
Product.hasMany(CardProviderSetting, { foreignKey: "product_id" , constraints: false });

//cardprovider and provider
CardProviderSetting.belongsTo(Provider, { foreignKey: "id" , constraints: false });
Provider.hasMany(CardProviderSetting, { foreignKey: "provider_ref" , constraints: false });

//Ticket and Ticket Reply
TicketReply.belongsTo(Ticket, { foreignKey: "id", constraints: false  });
Ticket.hasMany(TicketReply, { foreignKey: "ticket_id" , constraints: false });

//tax Setting and tax versioning
TaxSettingVersion.belongsTo(TaxSetting, { foreignKey: "tax_version_id", constraints: false  });
TaxSetting.hasMany(TaxSettingVersion, { foreignKey: "tax_version_id", constraints: false  });

//taxSetting and products
Product.hasMany(TaxSetting, { foreignKey: "product_id" , constraints: false });
TaxSetting.belongsTo(Product, { foreignKey: "id" , constraints: false });

//Order and Order Item
Order.hasMany(OrderItem,{foreignKey:"order_ref_id", constraints: false });
OrderItem.belongsTo(Order,{foreignKey:"id", constraints: false });


module.exports = db;
