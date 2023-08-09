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
    console.log(product);
    if (!product) {
      throw new Error("Product not found!");
    }
    //check error if product exists
    let providers = await providerService.getProviderDetails(
      product.provider_code
    );
    console.log(providers);
    return {
      provider: providers.name,
      images: product.image,
      product_code: product.product_code,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateCardListForPinePerks = async (value) => {
  try {
    return new Promise((resolve) => {
      let qty = parseInt(value.quantity);
      let customerList = [];

      console.log(qty);
      for (let i = 0; i < qty; i++) {
        let customerData = {
          recordIdentifier: "Row" + i,
          customerName: value.customer_name,
          mobileNumber: parseInt(value.customer_mobile),
          email: value.customer_email,
          amount: parseInt(value.amount),
          externalCardIdentifier: "abc00" + i,
        };
        customerList.push(customerData);
      }
      console.log(customerList);
      console.log("Resolved");
      resolve(customerList);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  checkProductAvailabilityAndPorviders,
  generateCardListForPinePerks,
};
