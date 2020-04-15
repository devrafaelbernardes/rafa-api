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

function generateRandomNumber(){
    return Math.floor(Math.random() * 1000);
}

module.exports = {
    encryptSHA256,
    encryptSHA512,
    generateSalt : () => {
        return encryptSHA256(Date.now() + generateRandomNumber());
    },
    encryptPassword : (password, salt) => {
        return encryptSHA512(password + (salt ? salt : ""));
    },
    encryptToken : (value) => {
        return encryptSHA256(value + new Date() + generateRandomNumber());
    }, 
    encryptCode : (value) => {
        value = value ? value : "";
        return encryptSHA256(Date.now() + value + generateRandomNumber());
    }
}