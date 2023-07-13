const { client } = require("../helpers");
const env = require("../env");
const { SUREPASS_ENDPOINT } = require("../core/constants")


const verifyPan = async (pan) => {

    try {

        const data = {
            "id_number": pan
        }

        const headers = {
            'Authorization': 'Bearer ' + env('SUREPASS_TOKEN')
        }
        
        const url = `${SUREPASS_ENDPOINT}/api/v1/pan/pan-comprehensive`;
        const response = await client.post(url, data, headers);
        // console.log(response);

        return true

    } catch (e) {
        console.log(e.response);
        return false;
    }
}

module.exports = {
    verifyPan,
}