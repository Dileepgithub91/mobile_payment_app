const { responseFlags } = require("../core/constants");
const ErrorHandler = require("../helpers/error.handler");
const logger = require("../logger");
const db = require("../models");

//Create Main Model
const SalesMargin = db.SalesMargin;

//Save Sales Margin
const saveSalesMargin = async (bodyData) => {
  try {
    const findSalesMargin = await SalesMargin.findAll({
      where: {
        product_id: bodyData.product_id,
      },
    });
    if (findSalesMargin.length != 0) {
      throw new ErrorHandler("Margin Already Exists!!",responseFlags.failure);
    }
    let margin = await SalesMargin.create(bodyData);
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////updte Sales Margin
const updateSalesMargin = async (bodyData, marginId) => {
  try {
    const findMargin = await SalesMargin.findAll({
      where: {
        id: marginId,
      },
    });
    if (findMargin.length == 0) {
      throw new ErrorHandler("margin Not Found!",responseFlags.notFound);
    }
    let margin = await SalesMargin.update(bodyData, {
      where: {
        id: marginId
      },
    });
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getSalesMargin = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const margin = await SalesMargin.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getSalesMarginByProductId = async (productId) => {
  try {
    const margin = await SalesMargin.findOne({
      where: {
        product_id: productId,
      },
    });
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getSalesMarginDetails = async (marginId) => {
  try {
    const margin = await SalesMargin.findOne({
      where: {
        id: marginId,
      },
    });
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const deleteSalesMargin = async (marginId) => {
  try {
    const margin = await SalesMargin.findOne({
      where: {
        id: marginId,
      },
    });
    if (margin) {
      return margin.destroy();
    }
    return margin;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveSalesMargin,
  updateSalesMargin,
  getSalesMargin,
  getSalesMarginDetails,
  deleteSalesMargin,
  getSalesMarginByProductId
};
