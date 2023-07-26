const pinePerksErrorHandler = (error) => {
  console.log(error);
  if (error.data) {
    if (error.data.responseCode === 318) {
      return {
        status: error.data.responseCode,
        code: "Dubilcate",
        message: error.data.responseMessage,
      };
    } else if (error.data.responseCode === 53) {
      return {
        status: error.data.responseCode,
        code: "BAD_REQUEST",
        message: error.data.responseMessage,
      };
    }
    return {
      status: error.data.responseCode,
      code: "BAD_REQUEST",
      message: error.data.responseMessage,
    };
  }
  if (error.response) {
    if (
      error.response.data.status == 403 ||
      error.response.data.error == "FORBIDDEN"
    ) {
      return {
        status: 403,
        code: "FORBIDDEN",
        message: "Authentication Failed , Access Restricted",
      };
    }
    return {
      status: error.response.data.status,
      code: error.response.data.error,
      message: error.response.data.message,
    };
  }
  return {
    status: 500,
    code: "INTERNAL ERROR",
    message: "An Error Occured, Please Contact provider!",
  };
};

const qwikCilverErrorHandler = (error) => {
  console.log(error);
  if (error.data) {
    if (
        error.data.response.status == 403 ||
        error.data.response.statusText == "Forbidden"
    ) {
      return {
        status: 403,
        code: "FORBIDDEN",
        message: "Authentication Failed , Access Restricted",
      };
    }
    return {
        status: error.data.response.status,
        code:  error.data.response.statusText,
        message: "An errro occured, Please Contact Provider!",
      };
  }
  if (error.response) {
    if (
      error.response.data.code == 6652 
    ) {
      return {
        status: 400,
        code: "BAD_REQUEST",
        message: "Invalid Category Id!",
      };
    }
    if (
      error.response.data.code == 1303 
    ) {
      return {
        status: 400,
        code: "BAD_REQUEST",
        message: "Invalid Product Id!",
      };
    }
    if (
      error.response.data.code == 5320 
    ) {
      return {
        status: 400,
        code: "BAD_REQUEST",
        message: "Invalid Order Id, Order ",
      };
    }
    return {
      status: error.response.data.code,
      code: "BAD_REQUEST",
      message: error.response.data.message,
    };
  }
  return {
    status: 500,
    code: "INTERNAL ERROR",
    message: "An Error Occured, Please Contact provider!",
  };
};

module.exports = {
  pinePerksErrorHandler,
  qwikCilverErrorHandler,
};
