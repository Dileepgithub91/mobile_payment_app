const logger = require("../logger");
const db = require("../models");

//Create Main Model
const UploadedCards = db.UploadedCards;
const CardFormat = db.CardFormat;

//Save Uploaded Cards
const saveUploadedCards = async (bodyData) => {
  try {
    let card;
    ///find Card With Same name
    const findCard = await UploadedCards.findAll({
      where: {
        card_no: bodyData.card_no,
      },
    });
    if (findCard.length != 0) {
      throw new Error("Card with this number exists!");
    }
    card = await UploadedCards.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Cards Service  -- save Uploaded Cards",
      error,
    });
    return { success: false, data: error };
  }
};

////update card api
const updateUploadedCards = async (bodyData, cardId) => {
  try {
    const findCard = await UploadedCards.findAll({
      where: {
        id: cardId,
      },
    });
    if (findCard.length == 0) {
      throw new Error("Card Not Found!");
    }
    let card = await UploadedCards.update(bodyData, {
      where: {
        id: cardId,
      },
    });
    return { success: true, data: card };
  } catch (error) {
    logger.log("info", error);
    return { success: false, data: error };
  }
};

const getUploadedCards = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const card = await UploadedCards.findAll({
      limit: limitPage,
      offset: offset,
      where: query || {},
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Card",
      error,
    });
    throw error;
  }
};

const getAllUploadedCard = async (query,quantity) => {
  try {
    const cards = await UploadedCards.findAll({
      limit: quantity,
      where: query,
      order: [
        [sequelize.literal(`CASE WHEN role = '4' THEN 1 ELSE 2 END`)],
        ['provider_id'],
      ]
    });
    return cards;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get all uploaded Card",
      error,
    });
    throw error;
  }
};

const getUploadedCardsDetails = async (cardId) => {
  try {
    const card = await UploadedCards.findOne({
      where: {
        id: cardId,
      },
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Uploaded Card details",
      error,
    });
    throw error;
  }
};

/// card Formating api:

//Save Card Format Data
const saveCardFormat = async (bodyData) => {
  try {
    let cardFormat;
    ///find Card format With Same name
    const findCardFormat = await CardFormat.findAll({
      where: {
        format_name: bodyData.name,
      },
    });
    if (findCardFormat.length != 0) {
      throw new Error("Card format name exists!");
    }
    cardFormat = await CardFormat.create(bodyData);
    return { success: true, data: cardFormat };
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Cards Service  -- save Uploaded Cards",
      error,
    });
    throw error;
  }
};

////update Card Format api
const updateCardFormat = async (bodyData, cardId) => {
  try {
    const findCardFormat = await CardFormat.findAll({
      where: {
        id: cardId,
      },
    });
    if (findCardFormat.length == 0) {
      throw new Error("Card Format Not Found!");
    }
    let cardFormat = await CardFormat.update(bodyData, {
      where: {
        id: cardId,
      },
    });
    return { success: true, data: cardFormat };
  } catch (error) {
    logger.log("error", error);
    throw error;
  }
};

const getCardFormat = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const cardFormat = await CardFormat.findAll({
      limit: limitPage,
      offset: offset,
      where: query || {},
    });
    return cardFormat;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Card",
      error,
    });
    throw error;
  }
};

const getCardFormatDetails = async (cardId) => {
  try {
    const cardFormat = await CardFormat.findOne({
      where: {
        id: cardId,
      },
    });
    return cardFormat;
  } catch (error) {
    logger.log("error", {
      source: "Uploaded Card Service  -- get Uploaded Card details",
      error,
    });
    throw error;
  }
};

module.exports = {
  getUploadedCards,
  getAllUploadedCard,
  getUploadedCardsDetails,
  saveUploadedCards,
  updateUploadedCards,
  ///card format
  getCardFormatDetails,
  getCardFormat,
  updateCardFormat,
  saveCardFormat,
};
