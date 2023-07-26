
const pinePerksErrorHandler=(error)=>{
    const errorStatus =error.response.data;
    if(errorStatus.status==403 ||errorStatus.error =="FORBIDDEN"){
        return "Authentication Failed , Access Restricted";
    }
    console.log(error.response.data);
    return errorStatus.message;
}

const qwikCilverErrorHandler=(error)=>{

}


module.exports={
    pinePerksErrorHandler,
    qwikCilverErrorHandler
};