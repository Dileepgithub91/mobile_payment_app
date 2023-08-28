const logger = require("../logger");
const db = require("../models");

//Create Main Model
const Product = db.Product;
const ProductPrice = db.ProductPrice;
const CardProviderSetting = db.CardProviderSetting;
const PurchasedCard = db.PurchasedCard;
const ActiveCard = db.ActiveCard;

///Card Services
//Save Pan verification Data
const saveCard = async (bodyData) => {
  try {
    let card;
    ///find Card With Same name
    const findCard = await Product.findAll({
      where: {
        product_code: bodyData.product_code,
      },
    });
    if (findCard.length != 0) {
      card = findCard[0].dataValues;
      await Product.update(bodyData, {
        where: {
          id: card.id,
        },
      });
      return card;
    }
    card = await Product.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", { source: "Card Service  -- save Card", error });
    return { success: false, data: error };
  }
};
////updte card api
const updateCard = async (bodyData, card_id) => {
  try {
    const findCard = await Product.findAll({
      where: {
        id: card_id,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await Product.update(bodyData, {
      where: {
        id: card_id,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};

const getCard = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const giftCard = await Product.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return giftCard;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Card", error });
    throw error;
  }
};
const getCardDetails = async (cardId) => {
  try {
    const giftCard = await Product.findOne({
      where: {
        id: cardId,
      },
    });
    return giftCard;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Card details", error });
    throw error;
  }
};

///Purchased Card Services

//Save Pan verification Data
const savePurchasedCard = async (bodyData) => {
  try {
    let card = await PurchasedCard.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", { source: "Card Service  -- save purchased Card", error });
    return { success: false, data: error };
  }
};
////update card api
const updatePurchasedCard = async (bodyData, id) => {
  try {
    const findCard = await PurchasedCard.findAll({
      where: {
        id: id,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await PurchasedCard.update(bodyData, {
      where: {
        id: id,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", { source: "Card Service  -- update purchased Card", error });
    return { success: false, data: error };
  }
};

const getPurchasedCard = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const card = await PurchasedCard.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return card;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get purchased Card", error });
    throw error;
  }
};

const getPurchasedCardDetails = async (cardId) => {
  try {
    const card = await PurchasedCard.findOne({
      where: {
        id: cardId,
      },
    });
    return card;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get purchased Card details", error });
    throw error;
  }
};

///Active Card Services

//Save Pan verification Data
const saveActiveCard = async (bodyData) => {
  try {
    let card = await ActiveCard.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", { source: "Card Service  -- save Active Card", error });
    return { success: false, data: error };
  }
};
////updte card api
const updateActiveCard = async (bodyData, id) => {
  try {
    const findCard = await ActiveCard.findAll({
      where: {
        id: id,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await ActiveCard.update(bodyData, {
      where: {
        id: id,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", { source: "Card Service  -- update Active Card", error });
    return { success: false, data: error };
  }
};

const getActiveCard = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const card = await ActiveCard.findAll({
      limit: limitPage,
      offset: offset,
      where: query ||{},
    });
    return card;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Active Card", error });
    throw error;
  }
};
const getActiveCardDetails = async (cardId) => {
  try {
    const card = await ActiveCard.findOne({
      where: {
        id: cardId,
      },
    });
    return card;
  } catch (error) {
    logger.log("error", { source: "Card Service  -- get Active Card details", error });
    throw error;
  }
};

module.exports = {
  getCard,
  getCardDetails,
  saveCard,
  updateCard,
  //Active Cards
  getActiveCardDetails,
  getActiveCard,
  updateActiveCard,
  saveActiveCard,
  //Purchased card
  getPurchasedCardDetails,
  getPurchasedCard,
  updatePurchasedCard,
  savePurchasedCard
};
