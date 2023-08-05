const { cardService} = require("../services");

const QwikCilverWorker= async(data)=>{
    let resError=[];
    let resSuccess=[];
    await data.forEach(async (product) => {
        ///update user
        const card = await cardService.saveCard({
          provider_code: product.sku,
          name: product.name,
          category_id:"gift_card",
          sub_category_id:"qwikcilver",
          product_description:"",
          priceType: "singleprice",
          min_price: product.minPrice,
          max_price: product.maxPrice,
          image: product.images.thumbnail,
        });
        if (!card.success) {
          responcesError.push(card.data);
        } else {
          responcesSuccess.push(card.data);
        }
      });
    return {message:"Operation Completed!",resError,resSuccess}
}

const PinePerksWorker= async(data)=>{
    let resError=[];
    let resSuccess=[];
    await data.forEach(async (product) => {
        ///update user
        const card = await cardService.saveCard({
          provider_code: product.cardSchemeId,
          name: product.cardName,
          category_id:"gift_card",
        sub_category_id:"qwikcilver",
        product_description:"",
        priceType: "singleprice",
          min_price: product.binInfo.startRange,
          max_price: product.binInfo.endRange,
          image: product.imageUrl,
        });
        if (!card.success) {
          responcesError.push(card.data);
        } else {
          responcesSuccess.push(card.data);
        }
      });
    return {message:"Operation Completed!",resError,resSuccess}
}

module.export={
    QwikCilverWorker,
    PinePerksWorker
}