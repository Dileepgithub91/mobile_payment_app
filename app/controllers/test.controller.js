const { surepassService } = require('../services');
const { response } = require('../helpers')
const logger = require('../logger');

const testOtp = async (req, res) => {
    // surepassService.verifyPan("TestPAN")
    logger.log("info", req)
    response.success(res,"asdfasd")
}

module.exports = {
    testOtp
}