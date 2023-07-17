const db = require("../models");

//Create Main Model
const businessCustomer = db.business_customer;

const addBusinessCustomerRequest = async (body) => {
  try {
    const mobileNO =body.mobileNo;
    const customer = await businessCustomer.findAll({
      where: {
        mobile_no: mobileNO,
      },
    });
    if(customer.length==0){
      customer = await businessCustomer.create(body);
    }else{
      delete body.mobileNo;
      customer = await businessCustomer.update(body,{
        where: {
          mobile_no: mobileNO,
        },
      })
    }
    
    return customer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBusinessCustomerRequest,
};
