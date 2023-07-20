const path = require("path");
const multer = require("multer");
const fileName = require("fs");

var attach_files = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fileName.existsSync("public")) {
      fileName.mkdir("public", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    if (!fileName.existsSync("public/uploadedagreementDocument/")) {
      fileName.mkdir("public/uploadedagreementDocument/", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    cb(null, "public/uploadedagreementDocument/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "agreement_"+Date.now() + ext);
  },
});
var BusinessAgreement = multer({
  storage: attach_files,
  // limits: {
  //   fieldNameSize: 300,
  //   fileSize: 1048576,
  // },
  fileFilter: function (req, file, callback) {
    if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "application/octet-stream" 
    ) {
      callback(null, true);
    } else {
      console.log("only use jpeg and png or jpg");
      callback(null, false);
    }
  },
});

module.exports = BusinessAgreement;
