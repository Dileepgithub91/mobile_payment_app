const express = require("express");
const taxSettingController = require("../controllers/tax.setting.controller");
const router = express.Router();

//Authentication middleware
const auth = require("../middleware/auth");

router.get("/settings",  auth("readOwn", "profile"), taxSettingController.getTaxSettings);
router.get("/setting",  auth("readOwn", "profile"), taxSettingController.getTaxSettingDetails);


module.exports = router;