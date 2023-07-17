const { surepassService, databaseService } = require('../services');
const { response } = require('../helpers')
const logger = require('../logger');

const testOtp = async (req, res) => {
    try {
        // console.log(await databaseService.query('select * from users limit 10'));
        // surepassService.verifyPan("TestPAN")
        // logger.log("info", req)
        response.success(res,"asdfasd")
    } catch (err) {
        res.json({
            'error': err.message
        })
    }
}

module.exports = {
    testOtp
}