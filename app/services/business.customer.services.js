const db = require("../models");

//Create Main Model
const businessCustomer = db.business_customer;

const addBusinessCustomerRequest = async (body) => {
  try {
    const customer = await businessCustomer.create(body);
    return customer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
    addBusinessCustomerRequest,
};
