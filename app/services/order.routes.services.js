const cardService = require("./card.service");
const providerService = require("./provider.service");

const checkProductAvailabilityAndPorviders = async (productId) => {
  try {
    ///no of providers
  //on which provider exists or not
  // whether the card is expired or not
   //check for providers
    //get product details and provider
    let product = await cardService.getCardDetails(productId);
    if(!product){
        throw new Error("Product not found!");
    }
    //check error if product exists
    let providers = await providerService.getProviderDetails(
      product.provider_code
    );
    console.log(providers);
    return {provider:providers.dataValue.name,images:product.image};
  } catch (err) {
    console.log(err);
    throw err;
  }
};


module.exports = {
  checkProductAvailabilityAndPorviders,
};
