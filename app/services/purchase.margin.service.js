const { responseFlags } = require('../core/constants');
const ErrorHandler = require('../helpers/error.handler');
const logger = require('../logger');
const db = require('../models');

//Create Main Model
const PurchaseMargin = db.PurchaseMargin;
const Product = db.Product;
const CardProviderSetting = db.CardProviderSetting;

//Save Sales Margin
const savePurchaseMargin = async (bodyData) => {
  try {
    const findPurchaseMargin = await PurchaseMargin.findAll({
      where: {
        product_id: bodyData.product_id,
      },
    });
    if (findPurchaseMargin.length != 0) {
      throw new ErrorHandler('Margin Already Exists!!',responseFlags.failure);
    }
    let margin = await PurchaseMargin.create(bodyData);
    return margin;
  } catch (error) {
    logger.log('info', error);
    throw error;
  }
};

////updte Sales Margin
const updatePurchaseMargin = async (bodyData, marginId) => {
  try {
    const findMargin = await PurchaseMargin.findAll({
      where: {
        id: marginId,
      },
    });
    if (findMargin.length == 0) {
      throw new ErrorHandler('margin Group Not Found!',responseFlags.notFound);
    }
    let margin = await PurchaseMargin.update(bodyData, {
      where: {
        id: marginId,
      },
    });
    return margin;
  } catch (error) {
    logger.log('info', error);
    throw error;
  }
};

const getPurchaseMargin = async ({ pageNumber, limitPerPage, query }) => {
  try {
    const limitPage = parseInt(limitPerPage) || 10;
    const pageNo = parseInt(pageNumber) || 1;

    const offset = (pageNo - 1) * limitPage;
    const margin = await PurchaseMargin.findAll({
      limit: limitPage,
      offset: offset,
      where: query,
      include: [
        {
          model: Product,
          attributes: ['name', 'id'],
        },
        {
          model: CardProviderSetting,
          attributes: ['name', 'id'],
        },
      ],
      attributes: [
        'id',
        'product_id',
        'provider_id',
        'margin_type',
        'margin',
        'max_margin',
        'frequency',
        'status',
      ],
    });
    return margin;
  } catch (error) {
    logger.log('info', error);
    throw error;
  }
};

const getPurchaseMarginDetails = async (marginId) => {
  try {
    const margin = await PurchaseMargin.findOne({
      where: {
        id: marginId,
      },
      include: [
        {
          model: Product,
        },
        {
          model: CardProviderSetting,
        },
      ],
    });
    return margin;
  } catch (error) {
    logger.log('info', error);
    throw error;
  }
};

const deletePurchaseMargin = async (groupId) => {
  try {
    const margin = await PurchaseMargin.findOne({
      where: {
        id: groupId,
      },
    });
    if (margin) {
      return margin.destroy();
    }
    return margin;
  } catch (error) {
    logger.log('info', error);
    throw error;
  }
};

module.exports = {
  savePurchaseMargin,
  updatePurchaseMargin,
  getPurchaseMargin,
  getPurchaseMarginDetails,
  deletePurchaseMargin,
};
