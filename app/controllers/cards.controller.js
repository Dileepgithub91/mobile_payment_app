const client = require("../services/client");

const getGiftCards = async (req, res) => {
    // console.log(client)
    const response = await client.get("https://jsonplaceholder.typicode.com/todos/1")
    console.log(`Worker ${process.pid}`);
    // console.log(response.data)
    res.json(response.data)
}

module.exports = {
    getGiftCards: getGiftCards
}