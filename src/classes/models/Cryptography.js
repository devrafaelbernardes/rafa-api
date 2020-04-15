import crypto from 'crypto';
import System from './System';
import Token from './Token';
import { KEY_SECRET_CRYPTO } from '../../config/server';

const classSystem = System();
const classToken = Token();

export const Cryptography = () => {
    return {
        encrypt({ value, type, random = false }) {
            if (random) {
                let random_value = classSystem.random(100000);
                value = value + random_value + (new Date()) + "";
            }
            value = value + KEY_SECRET_CRYPTO;

            //creating hash object 
            let hash = crypto.createHash(type);

            //passing the data to be hashed
            let data = hash.update(value, 'utf-8');
            //Creating the hash in the required format
            return data.digest('hex');
        },
        encryptSHA512({ value, random = false }) {
            return this.encrypt({ value, random, type: 'sha512' });
        },
        encryptSHA256({ value, random = false }) {
            return this.encrypt({ value, random, type: 'sha256' });
        },
        generateSalt(value) {
            return this.encryptSHA256({ value, random: true });
        },
        encryptPassword(password, salt) {
            return this.encryptSHA512({ value: password + salt });
        },
        encryptToken({ email }) {
            return classToken.create({ email });
        },
    }
}

export default Cryptography;