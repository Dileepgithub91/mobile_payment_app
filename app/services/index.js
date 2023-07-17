module.exports = {
    databaseService: require('./database'),
    dataGenService: require('./datagen.service'),
    surepassService: require('./surepass.service'),
    kycService: require('./kyc.service'),
    authServices: require('./auth.service'),
    userServices: require('./users.service'),
    userProfileServices: require('./user_profile.service'),
    userAddressServices: require('./user_addresses.service'),
    userKycDetailsServices: require('./user_kyc_details.service'),
    userTokenServices: require('./user_token.service'),
    businessCustomerServices: require('./business.customer.services')
}