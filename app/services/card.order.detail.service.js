const logger = require("../logger");
const db = require("../models");

//Create Main Model
const CardOrderDetail = db.CardOrderDetail;

//Save Card Order Detail 
const saveCardOrderDetail = async (bodyData) => {
  try {
    const findCardOrderDetail = await CardOrderDetail.findAll({
      where: {
        order_id: bodyData.order_id,
      },
    });
    if (findCardOrderDetail.length != 0) {
      throw new Error("Card Order Detail Already Exists!!");
    }
    let order = await CardOrderDetail.create(bodyData);
    return order;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////update Order
const updateCardOrderDetail = async (bodyData, cardOrderId) => {
  try {
    const findCardOrderDetail = await CardOrderDetail.findAll({
      where: {
        id: cardOrderId,
      },
    });
    if (findCardOrderDetail.length == 0) {
      throw new Error("Card Order Detail Not Found!");
    }
    let cardOrderDetail = await CardOrderDetail.update(bodyData, {
      where: {
        id: cardOrderId
      },
    });
    return cardOrderDetail;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Order
const getCardOrder = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const cardOrderDetail = await CardOrderDetail.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return cardOrderDetail;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Order Details
const getCardOrderDetail = async (cardOrderId) => {
  try {
    const cardOrder = await CardOrderDetail.findOne({
      where: {
        id: orderId,
      },
    });
    return cardOrder;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Order Details
const getCardOrderByOrderId = async (orderId) => {
  try {
    const cardOrder = await CardOrderDetail.findOne({
      where: {
        order_id: orderId,
      },
    });
    return cardOrder;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

//Delete Order
const deleteCardOrderDetail = async (cardOrderId) => {
  try {
    const cardOrderDetail = await CardOrderDetail.findOne({
      where: {
        id: orderId,
      },
    });
    if (cardOrderDetail) {
      return cardOrderDetail.destroy();
    }
    return cardOrderDetail;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveCardOrderDetail,
  updateCardOrderDetail,
  getCardOrder,
  getCardOrderDetail,
  deleteCardOrderDetail,
  getCardOrderByOrderId
};
