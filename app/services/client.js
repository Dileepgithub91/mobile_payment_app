const axios = require('axios')

const get = async (url) => {
    return axios.get(url)
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
