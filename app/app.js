const express = require("express");
const morgan = require('morgan')
const { testOtp } = require("./controllers/test.controller");
const route =require("./routes")
const port = 3000;

const app = express();
app.use(morgan('dev'));

require('dotenv').config();

// PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/",route);

app.get("/test", testOtp);

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

module.exports = app;