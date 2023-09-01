const { cardValidator } = require("../validations");
const fs = require("fs");
const csvParser = require("fast-csv");
const logger = require("../logger");
const db = require("../models");
const ErrorHandler = require("../helpers/error.handler");
const { responseFlags } = require("../core/constants");

//Create Main Model
const UploadedCardsTemp = db.UploadedCardsTemp;

//parse  and return array csv file

const parseCsvToGetArray = async (filePath) => {
  try {
    return new Promise(async (resolve, reject) => {
      const results = [];
      await fs
        .createReadStream(filePath)
        .pipe(csvParser.parse({ headers: true }))
        .on("error", (error) => logger.log("error", error))
        .on("data", async (data) => results.push(data))
        .on("end", async (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          resolve(results);
        });
    });
  } catch (error) {
    logger.log("error", {
      source: " Temp Uploaded Card Service  -- get Temp Card",
      error,
    });
    throw error;
  }
};

// temperory Uploaded Card
const saveUploadedCardsTemp = async (bodyData) => {
  try {
    let card;
    ///find Card With Same name
    const findCard = await UploadedCardsTemp.findAll({
      where: {
        card_no: bodyData.card_no,
      },
    });
    if (findCard.length != 0) {
      throw new ErrorHandler("Temp Card with this number exists!",responseFlags.failure);
    }
    card = await UploadedCardsTemp.create(bodyData);
    return { success: true, data: card };
  } catch (error) {
    console.log(error);
    logger.log("error", {
      source: "Temp Uploaded Cards Service  -- save Temp Uploaded Cards",
      error,
    });
    return { success: false, data: error };
  }
};

////update Temp card api
const updateUploadedCardsTemp = async (bodyData, cardId) => {
  try {
    const findCard = await UploadedCardsTemp.findAll({
      where: {
        id: cardId,
      },
    });
    if (findCard.length == 0) {
      throw new ErrorHandler("Temp Card Not Found!",responseFlags.notFound);
    }
    let card = await UploadedCardsTemp.update(bodyData, {
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

const getUploadedCardsTemp = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const card = await UploadedCardsTemp.findAll({
      limit: limitPage,
      offset: offset,
      where: query || {},
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: " Temp Uploaded Card Service  -- get Temp Card",
      error,
    });
    throw error;
  }
};

const getUploadedCardsTempDetails = async (cardId) => {
  try {
    const card = await UploadedCardsTemp.findOne({
      where: {
        id: cardId,
      },
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Temp Uploaded Card Service  -- get Temp Uploaded Card details",
      error,
    });
    throw error;
  }
};

const getUploadedCardsTempById = async (cardId) => {
  try {
    const card = await UploadedCardsTemp.findOne({
      where: {
        id: cardId,
        status:"PROCESSING"
      },
    });
    return card;
  } catch (error) {
    logger.log("error", {
      source: "Temp Uploaded Card Service  -- get Temp Uploaded Card details",
      error,
    });
    throw error;
  }
};

module.exports = {
  getUploadedCardsTemp,
  getUploadedCardsTempDetails,
  saveUploadedCardsTemp,
  updateUploadedCardsTemp,
  parseCsvToGetArray,
  getUploadedCardsTempById
};
