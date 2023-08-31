const nodeMailer = require("nodemailer");
const logger = require("../logger");

var transporter = nodeMailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sentEmail = async (email, subject, mailbody, SendFiles) => {
  // {
  //   filename: 'example.txt', // name of the attached file
  //   path: 'path/to/example.txt' // path to the file
  // }
  var mailOptions = {
    from: process.env.EMAIL_MAILER,
    to: email,
    subject: subject,
    html: mailbody,
    attachments: SendFiles,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.log("error", { source: "email-service--send mail", error });
    } else {
      logger.log("info", `Email sent: ${info.response}`);
    }
  });
};

module.exports = {
  sentEmail,
};
