const query = require('../services/database');
const client = require("../services/client");
const datagenit = require('../services/datagen.service');
const surepass = require('../services/surepass.service');
const env = require("../config");

const getGiftCards = async (req, res) => {
    // console.log(client)
    const response = await client.get("https://jsonplaceholder.typicode.com/todos/1")
    console.log(`Worker ${process.pid}`);
    // console.log(response.data)
    res.json(response.data)
}

const login = async (req, res) => {
    console.log(await query("select id, first_name, email from users where email = 'mnsoor007@hotmail.com'"))
    res.end("Done");
}

const testOtp = async (req, res) => {
    surepass.verifyPan("TestPAN")
    res.json({"test": "asdf"})
}

module.exports = {
    login,
    testOtp
}