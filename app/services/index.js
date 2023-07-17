module.exports = {
    databaseService: require('./database'),
    dataGenService: require('./datagen.service'),
    surepassService: require('./surepass.service'),
    kycService: require('./kyc.service'),
    authServices: require('./auth.service'),
    userServices: require('./users.service'),
    userProfileServices: require('./user.profile.service'),
    userAddressServices: require('./user.addresses.service'),
    userKycDetailsServices: require('./user.kyc.details.service'),
    userTokenServices: require('./user.token.service'),
    businessCustomerServices: require('./business.customer.services')
}