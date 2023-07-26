const pinePerksErrorHandler=(error)=>{
    const status =error.status;
    console.log(error);
    return error.message;
}

const qwikCilverErrorHandler=(error)=>{

}


module.exports={
    pinePerksErrorHandler,
    qwikCilverErrorHandler
};