// const crypto = require('crypto');

// function encrypt(plainText, key) {
//     const keyBuffer = crypto.createHash('md5').update(key, 'utf-8').digest();
//     // const initVector = Buffer.from([
//     //     0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
//     //     0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f
//     // ]);
//     const initVector = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, initVector);
//     console.log("initVector---", initVector)

//     let encryptedText = cipher.update(pad(plainText, 16), 'utf-8', 'hex');
//     encryptedText += cipher.final('hex');

//     return encryptedText;
// }

// function pad(text, blockSize) {
//     const paddingSize = blockSize - (text.length % blockSize);
//     const padding = String.fromCharCode(paddingSize).repeat(paddingSize);
//     return text + padding;
// }

// const plainText = "Hello, this is a test message.";
// const key = "mysecretkey";

// const encryptedText = encrypt(plainText, key);
// console.log('Encrypted Text:', encryptedText);








// // const toBytes = (string) => Array.from(Buffer.from(string, 'utf8'));


// // // Usage example:

// // const bytes = toBytes('Some text here...');

// // console.log(bytes);

// // --------------------------------------------------

// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc';
// const keyKistr = "A8B75348C733D5A2369B18BB36DC8C23";
// const key = Buffer.from(keyKistr, "utf-8");
// const iv = crypto.randomBytes(16);
// function encrypt(text) {
//     let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return { iv: iv.toString('hex'),
//     encryptedData: encrypted.toString('hex') };
// }

// var output = encrypt("GeeksforGeeks");
// console.log(output);


// // ------------------------------------------------
// import hashlib
// from Crypto.Cipher import AES
// import binascii
// from Crypto.Util.Padding import pad, unpad

// key = 'A8B75348C733D5A2369B18BB36DC8C23'
// key = hashlib.md5(key.encode("utf-8")).digest()


// def encrypt(plainText, key):
//     plainText = bytes(plainText, "UTF-8")
//     key = hashlib.md5(key.encode("utf-8")).digest()
//     initVector = bytes([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f])
//     # print("initVector  ===", initVector)
//     cipher = AES.new(key, AES.MODE_CBC, initVector)
//     # print(plainText)
//     encryptedText = cipher.encrypt(pad(plainText, AES.block_size))  # pad(plaintext, AES.block_size)
//     return binascii.hexlify(encryptedText).decode("utf-8")

// pt = "GeeksforGeeks"
// key = 'A8B75348C733D5A2369B18BB36DC8C23'

// encrypt(pt, key)




const crypto = require('crypto');
const axios = require('axios');
const algorithm = 'aes-256-cbc';
const keyKistr = "A8B75348C733D5A2369B18BB36DC8C23";
const accesscode = "AVNF51IZ54CB22RTEH"
const key = Buffer.from(keyKistr, "utf-8");
const iv = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
const ver = "1.1"
const instituteId = "SI12"


function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex') };
}

function decrypt(hashedDataObject) {
    let iv = Buffer.from(hashedDataObject.iv, 'hex');
    let encryptedText = Buffer.from(hashedDataObject.encryptedData, 'hex');
    // let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


var output = encrypt("GeeksforGeeks");
console.log(decrypt(output));

async function dmt_common_service(data){
    requestId = crypto.randomBytes(8).toString('hex') + Date.now().toString();  
    console.log("data -------" , data)  
    let url = "https://stgapi.billavenue.com/billpay/dmt/dmtServiceReq/xml?"
    url += `accessCode=${accesscode}&requestId=${requestId}&encRequest=${encrypt(data)}&ver=${ver}&instituteId=${instituteId}`
    try {
        let response = await axios.post(url);
        let data = response.data;
        console.log(data)
        let output = decrypt(data);
    } catch(error) {
        console.log(error)
        let output = error;
    }
    console.log("requestId -----", requestId)
    return output
}



function get_ifsc_service(ifsc){
    console.log("ifsc ---", ifsc)
    data = `<dmtServiceRequest>
    <requestType>IfscDetails</requestType>
    <ifsc>${ifsc}</ifsc>
    </dmtServiceRequest>`
    console.log("data -----", data)
    return dmt_common_service(data)
}


console.log(get_ifsc_service("SBIN00001786"));

