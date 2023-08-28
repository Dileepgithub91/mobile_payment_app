const logger = require("../logger");
const db = require("../models");

//Create Main Model
const TaxSettingHistory = db.TaxSettingHistory;
const Product = db.Product;

const getTaxSettingHistory = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const taxSettingHistory = await TaxSettingHistory.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
      include: [
        {
          model: Product,
          // attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
      ],
    });
    return taxSettingHistory;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getTaxSettingHistoryDetails = async (taxHistoryId) => {
  try {
    const taxSettingHistory = await TaxSettingHistory.findOne({
      where: {
        id: taxHistoryId,
      },
    });
    return taxSettingHistory;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  getTaxSettingHistory,
  getTaxSettingHistoryDetails,
};
