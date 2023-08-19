const { responseMessages, responseFlags } = require("../core/constants");
const catchAsyncError = require("../middleware/catch.async.error");
const ErrorHandler = require("../helpers/error.handler");
const { orderValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  orderService,
  cardOrderService,
  orderRouteService,
  qwikCilverService,
  pinePerkService,
  walletService,
  uploadedCardsService,
} = require("../services");

// save order
const createOrder = catchAsyncError(async (req, res, next) => {
  //@todo validate quantitiy
  //@todo routing to check availability of product
  let extOrderRes = {};
  let extCardOrderId;
  //validator
  const value = await orderValidator.saveOrder.validateAsync(req.body);
  //save user_id via authentication
  value.user_id = req.user.user_id;
  value.total_amount = value.quantity * value.amount;
  value.sell_amount = value.total_amount;
  logger.log("order", {
    message: "An order has initited!",
    user: value.user_id,
    product: value.product_id,
    Quantity: value.quantity,
    totalAmount: value.sell_amount,
    time: new Date().toISOString(),
  });
  /////check availabilty of products and return provider
  const provider = await orderRouteService.checkProductAvailabilityAndPorviders(
    value.product_id
  );
  console.log(provider);
  logger.log("order", {
    message: "provider have been fetched!",
    provider,
    time: new Date().toISOString(),
  });
  ///save order in order table
  const order = await orderService.saveOrder({
    user_id: value.user_id,
    product_id: value.product_id,
    quantity: value.quantity,
    amount: value.amount,
    total_amount: value.total_amount,
    sell_amount: value.sell_amount,
  });
  logger.log("order", {
    message: "Order Saved!",
    order,
    time: new Date().toISOString(),
  });
  ///Deduct money from wallet and store in ledger
  await orderRouteService.deductMoneyAsOrderAmount(value);
  logger.log("order", {
    message: "Money deducted!",
    amount: value.sell_amount,
    time: new Date().toISOString(),
  });
  // check amount again if it is negative if it is throw error
  const reCheckWallet = await walletService.getWalletByUserId(value.user_id);
  ///check if the amount is in negative
  if (parseInt(reCheckWallet.dmt_wallet) < 1) {
    throw new ErrorHandler("Wallet balance not enough!");
  }

  let providerList = provider.provider;
  let currProvider = providerList[0];
  for (let i = 0; i < providerList.length; i++) {
    //Directing flow according to providers
    if (currProvider == "admin") {
      extOrderRes = await orderRouteService.adminOrderFlow(value);
      if (extOrderRes.success == "1") {
        break;
      } else if (extOrderRes.success == "2") {
        // Recoverable error
        currProvider = providerList[i + 1];
        continue;
      } else {
        throw extOrderRes.error;
      }
    }

    if (currProvider == "user") {
      extOrderRes = await orderRouteService.userOrderFlow(value);
      if (extOrderRes.success == "1") {
        break;
      } else if (extOrderRes.success == "2") {
        // Recoverable error
        currProvider = providerList[i + 1];
        continue;
      } else {
        throw extOrderRes.error;
      }
    }

    if (currProvider == "qwikcilver") {
      extOrderRes = await orderRouteService.qwikcilverOrderFlow(value);
      if (extOrderRes.success == "1") {
        break;
      } else if (extOrderRes.success == "2") {
        // Recoverable error
        currProvider = providerList[i + 1];
        continue;
      } else {
        throw extOrderRes.error;
      }
    }

    if (currProvider == "pineperks") {
      extOrderRes = await orderRouteService.pinePerksOrderFLow(value);
      if (extOrderRes.success == "1") {
        break;
      } else if (extOrderRes.success == "2") {
        // Recoverable error
        currProvider = providerList[i + 1];
        continue;
      } else {
        throw extOrderRes.error;
      }
    }
    throw new Error("Card Not Available!");
  }

  //Save card order details data in card order details table
  const cardOrderDetails = await cardOrderService.saveCardOrderDetail({
    order_id: order.order_id,
    card_order_id: extCardOrderId,
    user_id: value.user_id,
    product_id: value.product_id,
    quantity: value.quantity,
    amount: value.amount,
    total_amount: value.sell_amount,
    customer_name: value.customer_name,
    customer_mobile: value.customer_mobile,
    customer_email: value.customer_email,
    image: provider.images,
    send_as_gift: value.send_as_gift,
  });

  console.log(extOrderRes);

  response.success(
    res,
    "Order placed successfully, delivery in progress!",
    extOrderRes
  );
});

const checkOrderStatus = catchAsyncError(async (req, res, next) => {
  let extOrderStatus = "no Order";
  let activeCard = {};
  const value = await orderValidator.checkOrderStatus.validateAsync(req.body);
  const orderDetail = await cardOrderService.getCardOrderByOrderId(
    value.order_id
  );
  if (!orderDetail) {
    throw new ErrorHandler("Order not Found!");
  }
  const provider = await orderRouteService.checkProductAvailabilityAndPorviders(
    orderDetail.product_id
  );
  if (provider.provider == "qwikcilver") {
    extOrderStatus = await qwikCilverService.getOrderStatusAPi({
      refno: orderDetail.order_id,
    });
    console.log(extOrderStatus);
    if (extOrderStatus.data.data.status != "COMPLETE") {
      response.success(
        res,
        "Your Card Order is still in Process, try again after some time!"
      );
      return true;
    }
    //update purchased card, orders status
  }
  if (provider.provider == "pineperks") {
    extOrderStatus = await pinePerkService.getCardOrderStatus({
      requsetId: orderDetail.order_id,
    });
    console.log(extOrderStatus);
    if (extOrderStatus.data.data.orderStatus != "6") {
      response.success(
        res,
        "Your Card Order is still in Process, try again after some time!"
      );
      return true;
    }
    //update purchased card, orders status
    activeCard = await orderRouteService.updatePurchasedCardAndSaveActiveCard(
      extOrderStatus.data.data,
      orderDetail
    );
  }

  response.success(res, "fetched Order status!", {
    extOrderStatus,
    activeCard,
  });
});

// edit order manually
const editOrder = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await orderValidator.editOrder.validateAsync(req.body);
  let id = value.id;
  delete value.id;
  ///update user
  const order = await orderService.updateOrder(value, id);
  response.success(res, "Order Have been updated!", order);
});
///update order status manually
const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  //validator
  const value = await orderValidator.validateUpdateStatus.validateAsync(
    req.body
  );
  ///update user
  const order = await orderService.updateOrder(
    { status: value.status },
    value.id
  );
  response.success(res, "Order Status updated!", order);
});
// get order lists
const getOrders = catchAsyncError(async (req, res, next) => {
  const bodyData = req.query;
  let requestData = {};
  body.pageNumber ? (requestData.pageNumber = body.pageNumber) : {};
  body.limitPerPage ? (requestData.limitPerPage = body.limitPerPage) : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  requestData.query.user_id = req.user.user_id;
  const orders = await orderService.getOrder(requestData);
  response.success(res, "List of Orders!", orders);
});
///get order details
const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const value = await orderValidator.validateOrderDetails.validateAsync(
    req.query
  );
  const order = await orderService.getOrderDetails(value.id);
  response.success(res, "Details Of Orders!", order);
});

module.exports = {
  createOrder,
  editOrder,
  updateOrderStatus,
  getOrders,
  getOrderDetails,
  checkOrderStatus,
};
