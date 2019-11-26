var crypto = require('crypto');

async function encryptSHA512(value){
    //creating hash object 
    var hash = crypto.createHash('sha512');
    //passing the data to be hashed
    var data = hash.update(value, 'utf-8');
    //Creating the hash in the required format
    return data.digest('hex');
}

async function encryptSHA256(value){
    //creating hash object 
    var hash = await crypto.createHash('sha256');
    //passing the data to be hashed
    var data = await hash.update(value, 'utf-8');
    //Creating the hash in the required format
    return data.digest('hex');
}

module.exports = {
    encryptSHA256,
    encryptSHA512,
    generateSalt : async() => {
        return await encryptSHA256(Date.now()+"");
    },
    encryptPassword : async(password, salt) => {
        return encryptSHA512(password + (salt ? salt : ""));
    },
    encryptToken : async(value) => {
        return encryptSHA256(value + new Date());
    }, 
    encryptCode : async(value) => {
        value = value ? value : "";
        return await encryptSHA256(Date.now()+value);
    }
}