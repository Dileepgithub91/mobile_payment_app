
const query = require('../services/database');

const login = async (req, res) => {
   console.log(await query("select id, first_name, email from users where email = 'mnsoor007@hotmail.com'"))
    res.end("Done");
}

module.exports = {
    login
}