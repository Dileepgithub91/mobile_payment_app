const query = require('./database');
const client = require("./client");
const env = require("../config");

const sendOtp = async () => {

    try {

        let smsConfig = {
            "auth": env('SMS_AUTH'),
            "senderid": env('SMS_SENDER_ID'),
            "msisdn": 9015483838,
            "message": "Dear customer, use this One Time Password 125 for verification. This OTP will be valid for the next 5 mins. Thanks & Regards - RZEE."
        }
    
        const queryString = '?' + new URLSearchParams(smsConfig).toString();
        let url = `https://api.datagenit.com/sms${queryString}`;
        const response = await client.get(url);

        return true

    } catch (e) {
        console.log(e);
        return false;
    }
}

const getBalance = async () => {

    try {

        let smsConfig = {
            "auth": env('SMS_AUTH')
        }
    
        const queryString = '?' + new URLSearchParams(smsConfig).toString();
        let url = `https://global.datagenit.com/API/checkBalance.php${queryString}`;
        const response = await client.get(url);
        // console.log(response);
        return true

    } catch (e) {
        console.log(e);
        return false;
    }
}

module.exports = {
    sendOtp,
    getBalance
}