
const pinePerksErrorHandler=(error)=>{
    const status =error.status;
    console.log("error from handler");
    console.log(error);
    console.log("error from handler data");
    console.log(error.response.data);
    return error.message;
}

const qwikCilverErrorHandler=(error)=>{

}


module.exports={
    pinePerksErrorHandler,
    qwikCilverErrorHandler
};