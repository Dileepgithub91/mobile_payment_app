const query = require('../services/database');
const logger = require('../logger');
const login = async (req, res) => {
    console.log(await query("select id, first_name, email from users where email = 'mnsoor007@hotmail.com'"))
    res.end("Done");
}

const testOtp = async (req, res) => {
    // surepass.verifyPan("TestPAN")
    logger.log("info", "TestPAN")
    res.json({"test": "asdf"})
}

module.exports = {
    login,
    testOtp
}