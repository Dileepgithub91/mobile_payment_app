const logger = require("../logger");
const db = require("../models");

//Create Main Model
const giftCardProducts = db.products;

//Save Pan verification Data
const SaveGiftCardProducts = async (bodyData) => {
  try {
    let giftCard;
    const findGiftCard = await giftCardProducts.findAll({
      where: {
        name: bodyData.name,
      },
    });
    if (findGiftCard.length != 0) {
      giftCard = findGiftCard[0].dataValues;
      await giftCardProducts.update(bodyData, {
        where: {
          id: giftCard.id,
        },
      });
    }

    giftCard = await giftCardProducts.create(bodyData);
    return {success:true,data:giftCard};
  } catch (error) {
    logger.log("info", error);
    return {success:false,data:error};
  }
};
const getGiftCardProducts = async ({ pageNumber, limitPerPage ,query}) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const giftCard = await giftCardProducts.findAll({
      limit: limitPage,
      offset: offset,
      where:query
    });
    return giftCard;
  } catch (error) {
    logger.log("info", error);
    throw error;
  }
};

module.exports = {
  SaveGiftCardProducts,
  getGiftCardProducts,
};
