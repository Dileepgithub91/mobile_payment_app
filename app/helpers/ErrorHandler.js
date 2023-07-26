const pinePerksErrorHandler=(error)=>{
    const status =error.data.status;
    console.log("error from handler");
    console.log(error);
    return error.data.message;
}

const qwikCilverErrorHandler=(error)=>{

}


module.exports={
    pinePerksErrorHandler,
    qwikCilverErrorHandler
};