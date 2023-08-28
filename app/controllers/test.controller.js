const { kycService,orderRouteService } = require("../services");
const { response } = require("../helpers");
const logger = require("../logger");

const testOtp = async (req, res) => {
  try {
    // const respo = await kycService.verifyPan("TestPAN");
    const order=await orderRouteService.calcMarginAndGst(req.body);
    // console.log(await databaseService.query('select * from users limit 10'));
    // surepassService.verifyPan("TestPAN")
    // logger.log("info", req)
    response.success(res, "asdfasd",order);
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

module.exports = {
  testOtp,
};
