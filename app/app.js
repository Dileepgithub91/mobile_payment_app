require('dotenv').config();
const express = require("express");
const morgan = require('morgan')
const { testOtp } = require("./controllers/test.controller");
const port = 3000;
const app = express();
app.use(morgan('dev'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", testOtp);

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

module.exports = app;