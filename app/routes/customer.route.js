const express = require("express");
const customerController = require("../controllers/business.customer.controller");
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

router.post("/add-business-customer-request",  auth("readOwn", "profile"), customerController.addNewBusinessCustomerrequest);


module.exports = router;
