const nodeMailer = require("nodemailer");
const logger = require("../logger");

var transporter = nodeMailer.createTransport({
    service:"Gmail",
    secure: true,
    auth:{
        user:process.env.EMAIL_USERNAME, 
        pass:process.env.EMAIL_PASSWORD
    }
});

const sentEmail = async (email,subject,mailbody) => {
  var mailOptions = {
    from: process.env.EMAIL_MAILER,
    to: email, 
    subject: subject,
    html: mailbody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        logger.log("error",{source:"email-service--send mail",error});
    } else {
        logger.log("info",`Email sent: ${info.response}`);
    }
  });
};

module.exports = {
    sentEmail
};