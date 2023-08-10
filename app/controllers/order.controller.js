const { responseMessages, responseFlags } = require("../core/constants");
const catchAsyncError = require("../middleware/catch.async.error");
const ErrorHandler = require("../helpers/error.handler");
const { orderValidator } = require("../validations");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  orderService,
  cardService,
  cardOrderService,
  orderRouteService,
  qwikCilverService,
  pinePerkService,
  walletService
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
  value.sell_amount = value.quantity * value.amount;
  /////check availabilty of products and return provider
  const provider = await orderRouteService.checkProductAvailabilityAndPorviders(
    value.product_id
  );
  console.log(provider);
  ///save order in order table 
  const order = await orderService.saveOrder({
    user_id: value.user_id,
    product_id: value.product_id,
    quantity: value.quantity,
    amount: value.amount,
    sell_amount:value.sell_amount,
  });

  ///Deduct money from wallet and store in ledger
  /**
   * check wallet money
   * if greater than sell_amount then deduct the money
   * save the ledger
   */
  const wallet=await walletService.getWalletByUserId(value.user_id);
  console.log(wallet);
  console.log("wallet");
  const remainBalance=parseInt(wallet.dmt_wallet)-parseInt(value.sell_amount);
  if(remainBalance<1){
    throw new ErrorHandler("Wallet balance not enough!");
  }
  let walletUpdateStatus= await walletService.updateWallet({dmt_wallet:remainBalance},wallet.id);
if(walletUpdateStatus[0]===1){
  
}
  //Directing flow according to providers
  if (provider.provider == "qwikcilver") {
    console.log("qwikcilver hit")
    extOrderRes = await qwikCilverService.createAnOrderApi({
      address: {
        salutation: "Mr.",
        firstname: "Jhon",
        lastname: "Deo",
        email: "jhon.deo@gmail.com",
        telephone: "+919999999999",
        line1: "address details1",
        line2: "address details 2",
        city: "bangalore",
        region: "Karnataka",
        country: "IN",
        postcode: "560076",
        gstn: "1234567890",
        code: "123",
        billToThis: true,
      },
      payments: [
        {
          code: "svc",
          amount: value.sell_amount,
        },
      ],
      products: [
        {
          sku: provider.product_code,
          price: value.amount,
          qty: value.quantity,
          currency: 356,
        },
      ],
      remarks: "Gift card",
      otp: "12345",
      refno: order.order_id,
      syncOnly: false,
      deliveryMode: "API",
    });
    extCardOrderId=extOrderRes.data.orderId;
    console.log(extOrderRes);
    const purchasedCard =await orderRouteService.savePurchasedCard("qwikcilver",extOrderRes,value);
  }

  if (provider.provider == "pineperks") {
    console.log("pineperks hit")
    if (value.quantity != 1) {
      const customerList= await orderRouteService.generateCardListForPinePerks(value);
      extOrderRes = await pinePerkService.bulkDigitalCardIssue({
        externalRequestId: order.order_id,
        cardSchemeId:  parseInt(provider.product_code),
        cardDetailList:customerList,
        orderDescription: null,
      });
    } else {
      extOrderRes = await pinePerkService.issueInstantDigitalCard({
        externalRequestId: order.order_id,
        cardSchemeId: provider.product_code.toString(),
        customerName: value.customer_name,
        mobileNumber: value.customer_mobile.toString(),
        email: value.customer_email,
        amount: value.amount.toString(),
        externalCardIdentifier: "abc123", //order  id
        orderDescription: null,
      });
    }
    extCardOrderId=extOrderRes.data.orderId;
    let purchasedCard =await orderRouteService.savePurchasedCard("pineperks",extOrderRes,value);
  }
  //Save card order details data in card order details table
  const cardOrderDetails = await cardOrderService.saveCardOrderDetail({
    order_id: order.order_id,
    card_order_id:extCardOrderId,
    user_id: value.user_id,
    product_id: value.product_id,
    quantity: value.quantity,
    amount: value.amount,
    total_amount: value.sell_amount,
    customer_name:value.customer_name,
    customer_mobile:value.customer_mobile,
    customer_email: value.customer_email,
    image: provider.images,
    send_as_gift:  value.send_as_gift
  });

  console.log(extOrderRes);

  response.success(
    res,
    "Order placed successfully, delivery in progress!",
    extOrderRes
  );
});

const checkOrderStatus = catchAsyncError(async (req, res, next) => {
  let extOrderStatus="no Order";
  let activeCard={};
  const value = await orderValidator.checkOrderStatus.validateAsync(req.body);
  const orderDetail=await cardOrderService.getCardOrderByOrderId(value.order_id);
  if(!orderDetail){
    return next(new ErrorHandler("Order not Found!"))
  }
  const provider = await orderRouteService.checkProductAvailabilityAndPorviders(
    orderDetail.product_id
  );
  if (provider.provider == "qwikcilver") {
    extOrderStatus = await qwikCilverService.getOrderStatusAPi({refno:orderDetail.order_id});
    console.log(extOrderStatus)
    if(extOrderStatus.data.data.status != "COMPLETE"){
      response.success(res,"Your Card Order is still in Process, try again after some time!");
      return true;
    }
   //update purchased card, orders status
  }
  if (provider.provider == "pineperks") {
    extOrderStatus = await pinePerkService.getCardOrderStatus({requsetId:orderDetail.order_id})
    console.log(extOrderStatus)
    if(extOrderStatus.data.data.orderStatus != "6"){
      response.success(res,"Your Card Order is still in Process, try again after some time!");
      return true;
    }
   //update purchased card, orders status
   activeCard= await orderRouteService.updatePurchasedCardAndSaveActiveCard(extOrderStatus.data.data,orderDetail);
  }

  response.success(
    res,
    "fetched Order status!",
    {extOrderStatus,activeCard}
  );
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
  checkOrderStatus
};
