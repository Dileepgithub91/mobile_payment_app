
const { databaseService, surepassService } = require('../services');

const updateUserProfile = async (req, res, next) => {
   console.log(await databaseService.query("select id, first_name, email from users where email = 'mnsoor007@hotmail.com'"))
    res.end("Done");
}

module.exports = {
    login
}