require('dotenv').config();
const express = require("express");
const cors =require("cors");
const morgan = require('morgan')
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const { testOtp } = require("./controllers/test.controller");
const errorMiddleware = require("./middleware/system.error");
const route = require("./routes")
const env = require("./env");
const port = env('APP_PORT') || 3001;
const app = express();
app.use(morgan('dev'));

app.use(cors());
// PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PASSPORT
passport.use(jwtStrategy);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/",route);

app.get("/api/v1/profile", passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send('Hello World!');
});

app.get("/test", testOtp);

//Middleware for Error
app.use(errorMiddleware);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Route Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.status(err.status || 500);
//   res.render('error');
// });



app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

module.exports = app;