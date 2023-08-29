const { responseMessages, responseFlags } = require("../core/constants");
const catchAsyncError = require("../middleware/catch.async.error");
const { orderValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  orderService,
  orderItemService,
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
  value.user_id = req.user.id;
  value.total_amount = value.quantity * value.amount;
  value.sell_amount = value.total_amount;
  logger.log("order", {
    message: "An order has initited!",
    user: value.user_id,
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
    send_as_gift: value.send_as_gift,
    total_amount: value.total_amount,
    sell_amount: value.sell_amount,
  });
  value.order_id = order.order_id;
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
    throw new Error("Wallet balance not enough!");
  }

  ///margin and gst calculations
  await orderRouteService.calcMarginAndGst(value);

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
  console.log(extOrderRes);
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
  console.log(cardOrderDetails);
  console.log(extOrderRes);

  response.success(
    res,
    "Order placed successfully, delivery in progress!",
    extOrderRes
  );
});

const createMultiProductOrder = catchAsyncError(async (req, res, next) => {
  let extOrderRes = {};
  let totalAmount = 0;
  let totalQuantity = 0;
  //fetch the oreder
  const value = await orderValidator.saveItemOrder.validateAsync(req.body);
  value.user_id = req.user.id;
  logger.log("order", {
    message: "An order has initited!",
    data: value,
    time: new Date().toISOString(),
  });
  const order = await orderService.saveOrder({
    user_id: value.user_id,
    no_of_items: value.items.length,
    total_quantity: value.total_quantity,
    total_amount: value.total_amount,
    sell_amount: value.total_amount,
    send_as_gift: value.send_as_gift,
    total_amount: value.total_amount,
    sell_amount: value.total_amount,
    customer_name: value.customer_name,
    customer_email: value.customer_email,
    customer_mobile: value.customer_mobile,
  });
  value.order_id = order.order_id;
  ///Deduct money from wallet and store in ledger
  await orderRouteService.deductMoneyAsOrderAmount(value);
  logger.log("order", {
    message: "Money deducted!",
    user_id: value.user_id,
    amount: value.total_amount,
    time: new Date().toISOString(),
  });
  // check amount again if it is negative if it is throw error
  const reCheckWallet = await walletService.getWalletByUserId(value.user_id);
  ///check if the amount is in negative
  if (parseInt(reCheckWallet.dmt_wallet) < 1) {
    throw new Error("Wallet balance not enough!");
  }

  for (let i = 0; i < order.no_of_items; i++) {
    const item = value.items[i];
    // /////check availabilty of products and return provider
    // const provider =
    //   await orderRouteService.checkProductAvailabilityAndPorviders(
    //     item.product_id
    //   );
    // logger.log("order", {
    //   message: "provider have been fetched!",
    //   provider,
    //   time: new Date().toISOString(),
    // });
    ///save order item in order item table
    const TotalAmounts = parseInt(item.quantity) * parseInt(item.amount);
    totalAmount = totalAmount + TotalAmounts;
    totalQuantity = totalQuantity + parseInt(item.quantity);
    const orderItem = await orderItemService.saveOrderItem({
      order_ref_id:order.id,
      user_id: value.user_id,
      order_id: value.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      amount: item.amount,
      total_amount: TotalAmounts,
      sell_amount: TotalAmounts,
    });
    logger.log("order", {
      message: "Order Item Saved!",
      orderItem,
      time: new Date().toISOString(),
    });
    value.currItem = orderItem.dataValues;
    ///margin and gst calculations
    await orderRouteService.calcMarginAndGstMultiProduct(value);

    // let providerList = provider.provider;
    // let currProvider = providerList[0];
    // for (let i = 0; i < providerList.length; i++) {
    //   //Directing flow according to providers
    //   if (currProvider == "admin") {
    //     extOrderRes = await orderRouteService.adminOrderFlow(value);
    //     if (extOrderRes.success == "1") {
    //       break;
    //     } else if (extOrderRes.success == "2") {
    //       // Recoverable error
    //       currProvider = providerList[i + 1];
    //       continue;
    //     } else {
    //       throw extOrderRes.error;
    //     }
    //   }

    //   if (currProvider == "user") {
    //     extOrderRes = await orderRouteService.userOrderFlow(value);
    //     if (extOrderRes.success == "1") {
    //       break;
    //     } else if (extOrderRes.success == "2") {
    //       // Recoverable error
    //       currProvider = providerList[i + 1];
    //       continue;
    //     } else {
    //       throw extOrderRes.error;
    //     }
    //   }

    //   if (currProvider == "qwikcilver") {
    //     extOrderRes = await orderRouteService.qwikcilverOrderFlow(value);
    //     if (extOrderRes.success == "1") {
    //       break;
    //     } else if (extOrderRes.success == "2") {
    //       // Recoverable error
    //       currProvider = providerList[i + 1];
    //       continue;
    //     } else {
    //       throw extOrderRes.error;
    //     }
    //   }

    //   if (currProvider == "pineperks") {
    //     extOrderRes = await orderRouteService.pinePerksOrderFLow(value);
    //     if (extOrderRes.success == "1") {
    //       break;
    //     } else if (extOrderRes.success == "2") {
    //       // Recoverable error
    //       currProvider = providerList[i + 1];
    //       continue;
    //     } else {
    //       throw extOrderRes.error;
    //     }
    //   }
    //   throw new Error("Card Not Available!");
    // }
    console.log(extOrderRes);
  }
  response.success(res, "New Order Created!", order);
});

const bulkOrderUpdateStatus = catchAsyncError(async (req, res, next) => {
  let extOrderRes = {};
  let extCardOrderId;
  //validator
  const value =
    await orderValidator.validatebulkOrderUpdateStatus.validateAsync(req.body);
  //find order_item_id
  const orderItem = await orderItemService.getOrderItemDetails(
    value.order_item_id
  );
  //find order:
  const order = await orderService.getOrderByOrderId(orderItem.order_id);
  /////check availabilty of products and return provider
  const provider = await orderRouteService.checkProductAvailabilityAndPorviders(
    orderItem.product_id
  );
  console.log(provider);
  let providerList = provider.provider;
  let currProvider = providerList[0];
  for (let i = 0; i < providerList.length; i++) {
    //Directing flow according to providers
    if (currProvider == "admin") {
      extOrderRes = await orderRouteService.adminOrderFlow(orderItem);
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
      extOrderRes = await orderRouteService.userOrderFlow(orderItem);
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
      extOrderRes = await orderRouteService.qwikcilverOrderFlow(orderItem);
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
      extOrderRes = await orderRouteService.pinePerksOrderFLow(orderItem);
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
  console.log(extOrderRes);
  //Save card order details data in card order details table
  const cardOrderDetails = await cardOrderService.saveCardOrderDetail({
    order_id: orderItem.order_id,
    card_order_id: extCardOrderId || "iuiuiu",
    user_id: orderItem.user_id,
    product_id: orderItem.product_id,
    quantity: orderItem.quantity,
    amount: orderItem.amount,
    total_amount: orderItem.sell_amount,
    customer_name: order.customer_name,
    customer_mobile: order.customer_mobile,
    customer_email: order.customer_email,
    image: provider.images,
    send_as_gift: order.send_as_gift,
  });
  //update Order_item table status
  await orderItemService.updateOrderItem(
    { status: value.status },
    orderItem.id
  );
  response.success(res, "Bulk Order Status updates!", order);
});

const checkOrderStatus = catchAsyncError(async (req, res, next) => {
  let extOrderStatus = "no Order";
  let activeCard = {};
  const value = await orderValidator.checkOrderStatus.validateAsync(req.body);
  const orderDetail = await cardOrderService.getCardOrderByOrderId(
    value.order_id
  );
  if (!orderDetail) {
    throw new Error("Order not Found!");
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
  bodyData.pageNumber ? (requestData.pageNumber = bodyData.pageNumber) : {};
  bodyData.limitPerPage
    ? (requestData.limitPerPage = bodyData.limitPerPage)
    : {};
  delete bodyData.pageNumber;
  delete bodyData.limitPerPage;
  requestData.query = bodyData;
  requestData.query.user_id = req.user.id;
  const orders = await orderService.getOrder(requestData);
  response.success(res, "List of Orders!", orders);
});
///get order details
const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const value = await orderValidator.validateOrderDetails.validateAsync(
    req.query
  );
  value.user_id = req.user.id;
  const order = await orderService.getOrderDetails(value);
  response.success(res, "Details Of Orders!", order);
});

//update order item
const updateOrderItem = catchAsyncError(async (req, res, next) => {
  const value = await orderValidator.validateOrderDetails.validateAsync(
    req.query
  );
  const orderItemId = value.id;
  delete value.id;
  value.user_id = req.user.id;
  const order = await orderItemService.updateOrderItem(value, orderItemId);
  response.success(res, "Order Item Updated!", order);
});
//remove an order item
const deleteOrderItem = catchAsyncError(async (req, res, next) => {
  const value = await orderValidator.validateOrderDetails.validateAsync(
    req.query
  );
  const order = await orderItemService.deleteOrderItem(value.id);
  response.success(res, "Order Item Updated!", order);
});

module.exports = {
  createOrder,
  editOrder,
  updateOrderStatus,
  getOrders,
  getOrderDetails,
  checkOrderStatus,
  deleteOrderItem,
  updateOrderItem,
  createMultiProductOrder,
  bulkOrderUpdateStatus,
};
