const query = require('./database');
const { client } = require("../helpers");
const env = require("../env");
const logger = require("../logger");
const { DATAGENIT_ENDPOINT } = require("../core/constants");

const sendOtp = async (mobileNo,otp) => {

    try {
        let smsConfig = {
            "auth": env('SMS_AUTH'),
            "senderid": env('SMS_SENDER_ID'),
            "msisdn": mobileNo,
            "message": `Dear customer, use this One Time Password ${otp} for verification. This OTP will be valid for the next 5 mins. Thanks & Regards - RZEE.`
        }
    
        const queryString = '?' + new URLSearchParams(smsConfig).toString();
        let url = `${DATAGENIT_ENDPOINT}/sms${queryString}`;
        const response = await client.get(url);

        return true;

    } catch (e) {
        logger.log("error", e);
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
        logger.log("info",e);
        return false;
    }
}

module.exports = {
    sendOtp,
    getBalance
}