const logger = require("../logger");
const db = require("../models");

//Create Main Model
const OrderItem = db.OrderItem;

//Save Order Item
const saveOrderItem = async (bodyData) => {
  try {
    const findOrderItem = await OrderItem.findOne({
      where: {
        product_id: bodyData.product_id,
        order_id:bodyData.order_id
      },
    });
    if (findOrderItem != null) {
      await OrderItem.update(bodyData,{
        where:{
            id:findOrderItem.id
        }
      })
      return {...findOrderItem,...bodyData};
    }
    let Order = await OrderItem.create(bodyData);
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////updte Order Item
const updateOrderItem = async (bodyData, OrderItemId) => {
  try {
    const findOrder = await OrderItem.findAll({
      where: {
        id: OrderItemId,
      },
    });
    if (findOrder.length == 0) {
      throw new Error("Order Not Found!");
    }
    let Order = await OrderItem.update(bodyData, {
      where: {
        id: OrderItemId
      },
    });
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getOrderItem = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const Order = await OrderItem.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getOrderItemByProductId = async (productId) => {
  try {
    const Order = await OrderItem.findOne({
      where: {
        product_id: productId,
      },
    });
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getOrderItemDetails = async (OrderId) => {
  try {
    const Order = await OrderItem.findOne({
      where: {
        id: OrderId,
      },
    });
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getProcessingOrderItem = async (OrderId) => {
  try {
    const Order = await OrderItem.findOne({
      where: {
        id: OrderId,
        status:"PROCESSING"
      },
    });
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const deleteOrderItem = async (OrderId) => {
  try {
    const Order = await OrderItem.findOne({
      where: {
        id: OrderId,
      },
    });
    if (Order) {
      return Order.destroy();
    }
    return Order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveOrderItem,
  updateOrderItem,
  getOrderItem,
  getOrderItemDetails,
  deleteOrderItem,
  getOrderItemByProductId,
  getProcessingOrderItem
};
