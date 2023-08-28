const logger = require("../logger");
const db = require("../models");

//Create Main Model
const TaxSetting = db.TaxSetting;
const TaxSettingVersion = db.TaxSettingVersion;
const Product = db.Product;

const getTaxSetting = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const taxSetting = await TaxSetting.findAll({
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
    return taxSetting;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getTaxSettingDetails = async (taxSettingId) => {
  try {
    const taxSetting = await TaxSetting.findOne({
      where: {
        id: taxSettingId,
      },
      include: [
        {
          model: Product,
          // attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
        {
          model: TaxSettingVersion,
          // attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
      ],
    });
    return taxSetting;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getTaxSettingByProduct = async (productId) => {
  try {
    const taxSetting = await TaxSetting.findOne({
      where: {
        product_id: productId,
      },
      include: [
        {
          model: Product,
          // attributes: ['first_name','middle_name','last_name', 'id', 'mobile_no','email'],
        },
      ],
    });
    return taxSetting;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};


module.exports = {
  getTaxSetting,
  getTaxSettingDetails,
  getTaxSettingByProduct
};
