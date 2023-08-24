const logger = require("../logger");
const db = require("../models");

//Create Main Model
const SalesMarginGroup = db.SalesMarginGroup;

//Save Sales Margin Group
const saveSalesMarginGroup = async (bodyData) => {
  try {
    const findSalesMarginGroup = await SalesMarginGroup.findAll({
      where: {
        name: bodyData.name,
      },
    });
    if (findSalesMarginGroup.length != 0) {
      throw new Error("Group Already Exists!!");
    }
    let marginGroup = await SalesMarginGroup.create(bodyData);
    return marginGroup;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

////updte Sales Margin
const updateSalesMarginGroup = async (bodyData, groupId) => {
  try {
    const findMarginGroup = await SalesMarginGroup.findAll({
      where: {
        id: groupId,
      },
    });
    if (findMarginGroup.length == 0) {
      throw new Error("margin Group Not Found!");
    }
    let marginGroup = await SalesMarginGroup.update(bodyData, {
      where: {
        id: groupId
      },
    });
    return marginGroup;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getSalesMarginGroup = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const marginGroup = await SalesMarginGroup.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
    });
    return marginGroup;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const getSalesMarginGroupDetails = async (groupId) => {
  try {
    const marginGroup = await SalesMarginGroup.findOne({
      where: {
        id: groupId,
      },
    });
    return marginGroup;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

const deleteSalesMarginGroup = async (groupId) => {
  try {
    const marginGroup = await SalesMarginGroup.findOne({
      where: {
        id: groupId,
      },
    });
    if (marginGroup) {
      return marginGroup.destroy();
    }
    return marginGroup;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  saveSalesMarginGroup,
  updateSalesMarginGroup,
  getSalesMarginGroup,
  getSalesMarginGroupDetails,
  deleteSalesMarginGroup
};
