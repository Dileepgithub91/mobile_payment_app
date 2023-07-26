const pinePerksErrorHandler = (error) => {
    if(error.data){
        if(error.data.responseCode===318){
            return{
                status: error.data.responseCode,
                code: errorStatus.error,
                message: error.data.responseMessage,
              }
          }
    }
   if(error.response){
    if (error.response.data.status == 403 || error.response.data.error == "FORBIDDEN") {
        return "Authentication Failed , Access Restricted";
      }
   }
  return  {
    status: 500,
    code: "INTERNAL ERROR",
    message: "An Error Occured, Please Contact provider!",
  };
};

const qwikCilverErrorHandler = (error) => {};

module.exports = {
  pinePerksErrorHandler,
  qwikCilverErrorHandler,
};
