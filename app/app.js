require('dotenv').config();
const express = require("express");
const morgan = require('morgan')
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const { testOtp } = require("./controllers/test.controller");
const route =require("./routes")
const port = 3000;
const app = express();
app.use(morgan('dev'));

// PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PASSPORT
app.use(passport.initialize());
// passport.use('jwt',jwtStrategy);
// passport config
require('./middleware/passport2')(passport);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/",route);

app.get("/test", testOtp);

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

module.exports = app;