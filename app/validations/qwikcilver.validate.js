const Joi = require("joi");

module.exports.getCategoryDetailsValidator = Joi.object({
  categoryId: Joi.string().required(),
});
module.exports.getProductDetailsValidator = Joi.object({
  productId: Joi.string().required(),
});
module.exports.getOrderDetailsValidator = Joi.object({
  orderId: Joi.string().required(),
});
module.exports.getCardBalanceValidator = Joi.object({
  pin: Joi.string().allow("").allow(null),
  sku: Joi.string(),
  cardNumber: Joi.string().required(),
});
module.exports.getOrderStatusValidator = Joi.object({
  refno: Joi.string().required(),
});
module.exports.getBankBenificiaryValidator = Joi.object({
  type: Joi.string().required(),
  accountNumber: Joi.string().required(),
  ifscCode: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  telephone: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required(),
  refno: Joi.string().required(),
});
module.exports.getUpiBenificiaryValidator = Joi.object({
  type: Joi.string().required(),
  vpa: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  telephone: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required(),
  refno: Joi.string().required(),
});
const cardSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  telephone: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required(),
  email: Joi.string().email().required(),
});
module.exports.orderResendValidator = Joi.object({
  incrementId: Joi.string().required(),
  cards: Joi.array().items(cardSchema).required(),
});
module.exports.newGiftCardOrderValidator = Joi.object({
  address: Joi.object({
    salutation: Joi.string(),
    firstname: Joi.string().required(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    telephone: Joi.string().pattern(/^\+\d{12}$/),
    line1: Joi.string(),
    line2: Joi.string(),
    city: Joi.string(),
    region: Joi.string(),
    country: Joi.string().required(),
    postcode: Joi.string().required(),
    billToThis: Joi.boolean(),
    gstn: Joi.string(),
    code: Joi.string(),
  }).required(),

  billing: Joi.object({
    salutation: Joi.string().allow("Mr.", "Mrs.", "Ms."),
    firstname: Joi.string().required(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    telephone: Joi.string().pattern(/^\+\d{12}$/),
    line1: Joi.string().required(),
    line2: Joi.string(),
    city: Joi.string().required(),
    region: Joi.string().required(),
    country: Joi.string().required(),
    postcode: Joi.string().required(),
    company: Joi.string(),
    gstn: Joi.string(),
    code: Joi.string(),
  }),

  isConsolidated: Joi.boolean(),

  payments: Joi.array()
    .items(
      Joi.object({
        code: Joi.string().required(),
        amount: Joi.number().positive().required(),
        poNumber: Joi.string().required(),
        poDate: Joi.string().isoDate(),
        mode: Joi.string(),
      })
    )
    .required(),

  orderType: Joi.string().valid("PAYOUT"),

  refno: Joi.string().required(),
  remarks: Joi.string().required(),

  deliveryMode: Joi.string().required(),
  egvDeliveryType: Joi.string(),

  products: Joi.array()
    .items(
      Joi.object({
        sku: Joi.string().required(),
        price: Joi.number().positive().required(),
        qty: Joi.number().positive().required(),
        currency: Joi.number().required(),
        payout: Joi.object({
          type: Joi.string(),
          ifscCode: Joi.string(),
          name: Joi.string(),
          accountNumber: Joi.string(),
          vpa: Joi.string(),
          id: Joi.string(),
          telephone: Joi.string().pattern(/^\+\d{12}$/),
          transactionType: Joi.string(),
          email: Joi.string().email(),
        }),
        giftMessage: Joi.string().allow(""),
        theme: Joi.string(),
        cardNumber: Joi.string(),
        trackData: Joi.string(),
        reloadCardNumber: Joi.string(),
        coBrandImageId: Joi.string(),
        packaging: Joi.string(),
      })
    )
    .required(),

  otp: Joi.string(),
  coBrandImageId: Joi.string(),
  cardnumber: Joi.string(),
  outletName: Joi.string(),

  shipping: Joi.object({
    method: Joi.string(),
  }),

  syncOnly: Joi.boolean(),
  couponCode: Joi.string(),
  deliveryMode: Joi.string(),
});

const addressSchema = Joi.object({
  salutation: Joi.string(),
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string().pattern(/^\+\d{12}$/),
  line1: Joi.string().required(),
  line2: Joi.string(),
  city: Joi.string(),
  region: Joi.string(),
  country: Joi.string().required(),
  postcode: Joi.string().required(),
  code: Joi.string(),
  billToThis: Joi.boolean(),
});
const billingSchema = Joi.object({
  salutation: Joi.string(),
  firstname: Joi.string().required(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  telephone: Joi.string().pattern(/^\+\d{12}$/),
  line1: Joi.string().required(),
  line2: Joi.string(),
  city: Joi.string(),
  region: Joi.string(),
  country: Joi.string().required(),
  postcode: Joi.string().required(),
  code: Joi.string(),
  company: Joi.boolean(),
});

const paymentSchema = Joi.object({
  code: Joi.string().required(),
  amount: Joi.number().required(),
});

const productSchema = Joi.object({
  sku: Joi.string().required(),
  price: Joi.number().required(),
  qty: Joi.number().required(),
  currency: Joi.number().required(),
  giftMessage: Joi.string().allow("").optional(),
  theme: Joi.string(),
  cardNumber: Joi.string().required(),
  trackData: Joi.string(),
  coBrandImageId: Joi.string(),
  packaging: Joi.string(),
});
module.exports.reverseOrderValidator = Joi.object({
  address: addressSchema.required(),
  billing: billingSchema.required(),
  payments: Joi.array().items(paymentSchema).required(),
  refno: Joi.string().required(),
  products: Joi.array().items(productSchema).required(),
  outletName: Joi.string().required(),
  orderType: Joi.string().required(),
  shipping: Joi.object({
    method: Joi.string().required(),
  }),
  syncOnly: Joi.boolean(),
  couponCode: Joi.string(),
  deliveryMode: Joi.string(),
});

const cardfortransectionSchema = Joi.object({
  cardNumber: Joi.string().max(50).required(),
  pin: Joi.string().allow("").max(25).required(),
});

module.exports.transectionHistoryValidator = Joi.object({
  startDate: Joi.string().isoDate(),
  endDate: Joi.string().isoDate(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  cards: Joi.array().items(cardfortransectionSchema).required(),
});
