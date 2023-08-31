const { kycService,orderRouteService } = require("../services");
const { response } = require("../helpers");
const generatePDF =require('../helpers/generate.pdf.helper');
const logger = require("../logger");

const testOtp = async (req, res) => {
  try {
    // const respo = await kycService.verifyPan("TestPAN");
    const order=await orderRouteService.calcMarginAndGst(req.body);
    // console.log(await databaseService.query('select * from users limit 10'));
    // surepassService.verifyPan("TestPAN")
    // logger.log("info", req)
    const htmlContent=`    <html>
    <body>
      <h1>Hello, PDF!</h1>
      <p>This is a sample HTML content.</p>
    </body>
  </html>
  `;
   const pdfPath= generatePDF(htmlContent,user.id,"test");
   console.log(pdfPath);
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
