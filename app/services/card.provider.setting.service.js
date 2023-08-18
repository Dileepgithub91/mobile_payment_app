const logger = require("../logger");
const db = require("../models");

//Create Main Model
const cardProviderSetting = db.card_provider_setting;

const getCardProvider = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const cardProvider = await cardProviderSetting.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return cardProvider;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getCardProviderDetails = async (providerId) => {
  try {
    const cardProvider = await cardProviderSetting.findOne({
      where: {
        id: providerId,
      },
    });
    return cardProvider;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getCardProviderByProductId = async (productId) => {
  try {
    const cardProvider = await cardProviderSetting.findAll({
      where: {
        product_id: productId,
      },
    });
    return cardProvider;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  getCardProvider,
  getCardProviderDetails,
  getCardProviderByProductId
};
