import CryptoJS from 'crypto-js';
import SHA256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

import System from './System';
import Token from './Token';
import { KEY_SECRET_CRYPTO } from '../../config/server';

const classSystem = System();
const classToken = Token();

export const Cryptography = () => {
    return {
        encrypt({ value, type, random = false, salt = "" }) {
            if (random) {
                let random_value = classSystem.random(100000);
                value = value + random_value + (new Date()) + "";
            }
            let crypted = null;
            if (type === 'sha256') {
                value = value + KEY_SECRET_CRYPTO;
                crypted = Base64.stringify(SHA256(value));
            } else {
                crypted = Base64.stringify(hmacSHA512(value, salt+KEY_SECRET_CRYPTO));
            }
            return crypted;
        },
        encryptSHA512({ value, random = false, salt }) {
            return this.encrypt({ value, random, type: 'sha512', salt });
        },
        encryptSHA256({ value, random = false }) {
            return this.encrypt({ value, random, type: 'sha256', salt });
        },
        generateSalt(value) {
            return this.encryptSHA256({ value, random: true });
        },
        encryptPassword(password, salt) {
            return this.encryptSHA512({ value: password + salt, salt });
        },
        encryptToken({ email }) {
            return classToken.create({ email });
        },
        encryptAES(value) {
            return CryptoJS.AES.encrypt(value, KEY_SECRET_CRYPTO).toString();
        },
        decryptAES(value) {
            var bytes = CryptoJS.AES.decrypt(value, KEY_SECRET_CRYPTO);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
        encryptTokenURL(value) {
            return CryptoJS.AES.encrypt(value, KEY_SECRET_CRYPTO).toString();
        },
        decryptTokenURL(value) {
            var bytes = CryptoJS.AES.decrypt(value, KEY_SECRET_CRYPTO);
            return bytes.toString(CryptoJS.enc.Utf8);
        },
    }
}

export default Cryptography;