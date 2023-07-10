const axios = require('axios')

const get = async (url) => {
    return axios.get(url)
}

const post = async (url, data) => {
    return axios.post(url, data)
}

module.exports = {
    'get': get,
    'post': post
}
