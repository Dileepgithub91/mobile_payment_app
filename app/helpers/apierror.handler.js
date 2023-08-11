const pinePerksErrorHandler = (error) => {
  let resData = null;
  if (!error.data || !error.response) {
    return {
      status: 500,
      code: "INTERNAL ERROR",
      message: "An Error Occured, Please Contact provider!",
    };
  }

  if (error.data.responseCode === 318) {
    resData = {
      status: error.data.responseCode,
      code: "Dubilcate",
      message: "Order has been completed, check Order Status!",
    };
  }

  if (error.data.responseCode === 53) {
    resData = {
      status: error.data.responseCode,
      code: "BAD_REQUEST",
      message: error.data.responseMessage,
    };
  }

  if (
    error.response.data.status == 403 ||
    error.response.data.error == "FORBIDDEN"
  ) {
    resData = {
      status: 403,
      code: "FORBIDDEN",
      message: "Authentication Failed , Access Restricted",
    };
  }
  if (resData == null) {
    error.data
      ? (resData = {
          status: error.data.responseCode,
          code: "BAD_REQUEST",
          message: error.data.responseMessage,
        })
      : {};

    error.response
      ? (resData = {
          status: error.response.data.status,
          code: error.response.data.error,
          message: error.response.data.message,
        })
      : {};
  }
  return resData;
};

const qwikCilverErrorHandler = (error) => {
  let resdata =null;
  if (!error.data || !error.response) {
    return {
      status: 500,
      code: "INTERNAL ERROR",
      message: "An Error Occured, Please Contact provider!",
    };
  }

  if (
    error.data.response.status == 403 ||
    error.data.response.statusText == "Forbidden"
  ) {
    resdata = {
      status: 403,
      code: "FORBIDDEN",
      message: "Authentication Failed , Access Restricted",
    };
  }
  if (error.response.data.code == 6652) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Category Id!",
    };
  }
  if (error.response.data.code == 1303) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Product Id, products with id does not exists!",
    };
  }
  if (error.response.data.code == 5320) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Order Id, Order With id does not exists!",
    };
  }
  if (error.response.data.code == 6049) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message:
        "Balance Enquiry Failed,Either Card Number or Card Pin is Incorrect!",
    };
  }
  if (error.response.data.code == 5140 || error.response.data.code == 5141) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Either Card Number or Card Pin is Incorrect!",
    };
  }
  if (error.response.data.code == 6047) {
    resdata = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Balance Enquiry Failed, Incorrect sku!",
    };
  }

  if(resdata==null){
    error.data
    ? (resdata = {
        status: error.data.responseCode,
        code: "BAD_REQUEST",
        message: error.data.responseMessage,
      })
    : {};

  error.response
    ? (resdata = {
        status: error.response.data.status,
        code: error.response.data.error,
        message: error.response.data.message,
      })
    : {};
  }

  return resdata;
};

module.exports = {
  pinePerksErrorHandler,
  qwikCilverErrorHandler,
};
