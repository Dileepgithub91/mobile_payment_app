const axios = require('axios')
const {pinePerksErrorHandler} =require("../helpers/ErrorHandler");
const get = async (url,headers={}) => {
    const config = {
        headers
    };
    axios.get(url,config)
    .then(response => {
      // Process the response data here
     return response;
    })
    .catch(err => {
      // Handle the error here
     throw  pinePerksErrorHandler(err);
    });
    // return axios.get(url,config)
}

const post = async (url, data={}, headers={}) => {
    const config = {
        headers
    };
    return axios.post(url, data, config)
}

module.exports = {
    'get': get,
    'post': post
}
