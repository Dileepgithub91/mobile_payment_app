const pinePerksErrorHandler = (error) => {
  const errorStatus = error.response.data;
  if (errorStatus.status == 403 || errorStatus.error == "FORBIDDEN") {
    return "Authentication Failed , Access Restricted";
  }
  console.log(error);
  return {
    status: errorStatus.status,
    code: errorStatus.error,
    message: errorStatus.message,
  };
};

const qwikCilverErrorHandler = (error) => {};

module.exports = {
  pinePerksErrorHandler,
  qwikCilverErrorHandler,
};
