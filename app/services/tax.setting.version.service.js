const logger = require("../logger");
const db = require("../models");

//Create Main Model
const TaxSettingVersion = db.TaxSettingVersion;

const getTaxSettingVersion = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const taxSettingVersion = await TaxSettingVersion.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return taxSettingVersion;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getTaxSettingVersionDetails = async (taxVersionId) => {
  try {
    const taxSettingVersion = await TaxSettingVersion.findOne({
      where: {
        id: taxVersionId,
      },
    });
    return taxSettingVersion;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  getTaxSettingVersion,
  getTaxSettingVersionDetails
};
