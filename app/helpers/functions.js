const jwt = require("jsonwebtoken");
const crypto = require('crypto');

exports.genAuthToken = async (userId,deviceType,ipAddress) => {
  const userObj = { sub: userId ,deviceType:deviceType,ipAddress:ipAddress}; //dveice type
  const token = jwt.sign(userObj, process.env.DB_SECRET, { expiresIn: "1d" });
  return token;
};

exports.generateStrongPassword=async(length)=> {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  while (password.length < length) {
    const randomBytes = crypto.randomBytes(1);
    const randomIndex = randomBytes[0] % charset.length;
    password += charset[randomIndex];
  }
  return password;
}

exports.generateSixDigitRandomNumber=async()=> {
  return  Math.floor(100000 + Math.random() * 900000);
}
exports.generateRandomSecureToken=async()=> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(24,async(err, buffer)=>{
      if(err)reject(err);
      let token =buffer.toString('hex');
      resolve(token);
    });
  }); 
  
}

exports.calcPercentage=async(amount,percentage)=>{
  let data= (parseFloat(percentage).toFixed(5)/100*parseFloat(amount).toFixed(5));
  return data.toFixed(5);
}