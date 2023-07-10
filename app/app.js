const express = require("express");
const boom = require('@hapi/boom');
const { testOtp } = require("./controllers/test.controller");
const route =require("./routes")
const port = 3000;

const app = express();

// PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/",route);

app.get("/test", testOtp);

//error Handlar
app.use((err, req, res, next) => {
  console.log(boom.isBoom(err));
  if (boom.isBoom(err)) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`);
});

module.exports = app;