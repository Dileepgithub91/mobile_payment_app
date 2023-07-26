const pinePerksErrorHandler = (error) => {
    console.log(error);
    if(error.data){
        if(error.data.responseCode===318){
            return{
                status: error.data.responseCode,
                code: "Dubilcate",
                message: error.data.responseMessage,
              }
          }else if(error.data.responseCode===53){
            return{
                status: error.data.responseCode,
                code: "BAD_REQUEST",
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
