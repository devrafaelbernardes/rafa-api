// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

const PORT = 4040;
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
    isDevelopment : isDevelopment,
    PORT : PORT
}