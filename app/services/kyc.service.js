const { client } = require("../helpers");
const env = require("../env");
const { SUREPASS_ENDPOINT } = require("../core/constants")


//Pan verification
const verifyPan = async (pan) => {
    try {
      const data = {"id_number": pan}
      const headers = {
          'Authorization': 'Bearer ' + env('SUREPASS_TOKEN'),
          'Content-Type':'application/json'
      }
      const url = `${SUREPASS_ENDPOINT}/api/v1/pan/pan-comprehensive`;
      const response = await client.get(url,data, headers);
  
      return {
        success: true,
        message: "Pan Verified Successfully!",
        data: response.data,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        message: "Pan Verification Failed, enter correct pan number!",
        data: e
      };
    }
  };

  ///Aadhar Verification
const generateAadharOtp = async (aadhar) => {
    try {
      const data = {"id_number": aadhar}
      const headers = {
          'Authorization': 'Bearer ' + env('SUREPASS_TOKEN'),
          'Content-Type':'application/json'
      }
      const url = `${SUREPASS_ENDPOINT}/api/v1/aadhaar-v2/generate-otp`;
      const response = await client.get(url, data,headers);
  
      return {
        success: true,
        message: "Aadhar Otp Sent Successfully!",
        data: response.data,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        message: "Aadhar Otp Generation Failed, enter correct aadhar number!",
        data: e
      };
    }
  };
const VerifyAadharOtp = async (ClientId,Otp) => {
    try {
      const data = {"client_id": ClientId,"otp": Otp}
      const headers = {
          'Authorization': 'Bearer ' + env('SUREPASS_TOKEN'),
          'Content-Type':'application/json'
      }
      const url = `${SUREPASS_ENDPOINT}/api/v1/aadhaar-v2/submit-otp`;
      const response = await client.get(url, data,headers);
  
      return {
        success: true,
        message: "Aadhar otp verified Successfully!",
        data: response.data,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        message: "Aadhar Otp verification Failed!",
        data: e
      };
    }
  };

  ///GST Verification
const verifyGst = async (gstNo) => {
    try {
      const data = {"id_number": gstNo,"filing_status_get":true}
      const headers = {
          'Authorization': 'Bearer ' + env('SUREPASS_TOKEN'),
          'Content-Type':'application/json'
      }
      const url = `${SUREPASS_ENDPOINT}/api/v1/corporate/gstin`;
      const response = await client.get(url,data, headers);
  
      return {
        success: true,
        message: "Gst Verified Successfully!",
        data: response.data,
      };
    } catch (e) {
      console.log(e.response);
      return {
        success: false,
        message: "GST Verification Failed, enter correct GST number!",
        data: e
      };
    }
  };


module.exports = {
    verifyPan,
    generateAadharOtp,
    VerifyAadharOtp,
    verifyGst
}