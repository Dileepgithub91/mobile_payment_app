const query = require('../services/database');
const client = require("../services/client");

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
    let smsConfig = {
        "auth": "D!~2453vgqsZZU6Bd",
        "senderid": "rzeein",
        "msisdn": 7696543637,
        "message": "Hello World"
    }

    const queryString = '?' + new URLSearchParams(smsConfig).toString();
    let url = `https://api.datagenit.com/sms${queryString}`
    const response = await client.get(url)
    console.log(response)
    res.json(response.data)
 }

module.exports = {
    login,
    testOtp
}