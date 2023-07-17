const Validator = require("../validations/business.customer.validate");
const { response } = require("../helpers");
const logger = require("../logger");
const {
  businessCustomerServices
} = require("../services");

const addNewBusinessCustomerrequest = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const imageUrl = "";
    const value = await Validator.saveNewCustomerRequest.validateAsync(bodyData);
    if (req.file) {
      imageUrl = req.file.path || "";
    }
    ///update user
    const customer= await businessCustomerServices.addBusinessCustomerRequest(value);
    
    response.success(res, "Business Customer Service Request Submitted!",customer);
  } catch (error) {
    logger.log("info", error.message);
    console.log(error);
    response.generalError(res, error.message);
  }
};

module.exports = {
  addNewBusinessCustomerrequest,
};
