const logger = require("../logger");
const db = require("../models");
const HelperFunction = require("../helpers/functions");

//Create Main Model
const Order = db.Order;

//Save Sales Order 
const saveOrder = async (bodyData) => {
  try {
    const now =new Date();
    const saveData={...bodyData};
    saveData.order_id=`SKODR${now.getFullYear()}${now.getMonth()+1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${ await HelperFunction.generateSixDigitRandomNumber()}`;
    console.log(saveData);
    let order = await Order.create(saveData);
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////update Order
const updateOrder = async (bodyData, orderId) => {
  try {
    const findOrder = await Order.findAll({
      where: {
        order_id: orderId,
      },
    });
    if (findOrder.length == 0) {
      throw new Error("Order Not Found!");
    }
    let order = await Order.update(bodyData, {
      where: {
        order_id: orderId
      },
    });
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Order
const getOrder = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const order = await Order.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Order Details
const getOrderDetails = async (orderId) => {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Delete Order
const deleteOrder = async (orderId) => {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (order) {
      return order.destroy();
    }
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveOrder,
  updateOrder,
  getOrder,
  getOrderDetails,
  deleteOrder
};
