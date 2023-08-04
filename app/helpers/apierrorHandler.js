const pinePerksErrorHandler = (error) => {
  let resdata;
  let errorData = {
    status: error.data.responseCode,
    code: "BAD_REQUEST",
    message: error.data.responseMessage,
  };
  let defaultData = {
    status: 500,
    code: "INTERNAL ERROR",
    message: "An Error Occured, Please Contact provider!",
  };
  let errorResponce = {
    status: error.response.data.status,
    code: error.response.data.error,
    message: error.response.data.message,
  };
  error.data ? (resdata = errorData) : (resdata = defaultData);
  error.response ? (resdata = errorResponce) : (resdata = defaultData);

  if (error.data.responseCode === 318) {
    errorData = {
      status: error.data.responseCode,
      code: "Dubilcate",
      message: error.data.responseMessage,
    };
  }

  if (error.data.responseCode === 53) {
    errorData = {
      status: error.data.responseCode,
      code: "BAD_REQUEST",
      message: error.data.responseMessage,
    };
  }

  if (
    error.response.data.status == 403 ||
    error.response.data.error == "FORBIDDEN"
  ) {
    errorResponce = {
      status: 403,
      code: "FORBIDDEN",
      message: "Authentication Failed , Access Restricted",
    };
  }
  return resData;
};

const qwikCilverErrorHandler = (error) => {
  let resdata;
  let defaultData = {
    status: 500,
    code: "INTERNAL ERROR",
    message: "An Error Occured, Please Contact provider!",
  };
  let errorData = {
    status: error.data.response.status,
    code: error.data.response.statusText,
    message: "An errro occured, Please Contact Provider!",
  };
  let errorResponce = {
    status: error.response.data.code,
    code: "BAD_REQUEST",
    message: error.response.data.message,
  };
  error.data ? (resdata = errorData) : (resdata = defaultData);
  error.response ? (resdata = errorResponce) : (resdata = defaultData);

  if (
    error.data.response.status == 403 ||
    error.data.response.statusText == "Forbidden"
  ) {
    errorData = {
      status: 403,
      code: "FORBIDDEN",
      message: "Authentication Failed , Access Restricted",
    };
  }
  if (error.response.data.code == 6652) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Category Id!",
    };
  }
  if (error.response.data.code == 1303) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Product Id, products with id does not exists!",
    };
  }
  if (error.response.data.code == 5320) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Invalid Order Id, Order With id does not exists!",
    };
  }
  if (error.response.data.code == 6049) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message:
        "Balance Enquiry Failed,Either Card Number or Card Pin is Incorrect!",
    };
  }
  if (error.response.data.code == 5140 || error.response.data.code == 5141) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Either Card Number or Card Pin is Incorrect!",
    };
  }
  if (error.response.data.code == 6047) {
    errorResponce = {
      status: 400,
      code: "BAD_REQUEST",
      message: "Balance Enquiry Failed, Incorrect sku!",
    };
  }

  return resdata;
};

module.exports = {
  pinePerksErrorHandler,
  qwikCilverErrorHandler,
};
