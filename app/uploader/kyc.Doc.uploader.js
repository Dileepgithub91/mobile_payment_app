const path = require("path");
const multer = require("multer");
const fileName = require("fs");

var attach_files = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId=req.user?req.user.id :"anonamus";
    if (!fileName.existsSync("uploads")) {
      fileName.mkdir("uploads", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    if (!fileName.existsSync("uploads/kycDocument/")) {
      fileName.mkdir("uploads/kycDocument/", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    if (!fileName.existsSync("uploads/kycDocument/"+userId)) {
      fileName.mkdir("uploads/kycDocument/"+userId, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("New directory successfully created.");
        }
      });
    }
    cb(null, "uploads/kycDocument/"+userId);
  },
  filename: function (req, file, cb) {
    const userId=req.user?req.user.id :"anonamus";
    let ext = path.extname(file.originalname);
    cb(null, userId+"_"+Date.now() + ext);
  },
});
var ProfileImage = multer({
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

module.exports = ProfileImage;
