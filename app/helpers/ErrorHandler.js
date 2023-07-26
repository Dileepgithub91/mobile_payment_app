
const pinePerksErrorHandler=(error)=>{
    const status =error.status;
    console.log("error from handler");
    console.log(error);
    console.log(error.code);
    console.log(error.request);
    return error.message;
}

const qwikCilverErrorHandler=(error)=>{

}


module.exports={
    pinePerksErrorHandler,
    qwikCilverErrorHandler
};