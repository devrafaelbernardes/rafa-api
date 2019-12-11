// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

const PORT = 4040;
const isDevelopment = process.env.NODE_ENV !== "production";
const BASE_ROUTE = "/";
const LINK_SERVER = isDevelopment ? 'http://localhost:'+PORT+'/' : 'https://www.api.rbernardes.com.br'+BASE_ROUTE;
const LINK_IMAGES = LINK_SERVER+'image/';

module.exports = {
    isDevelopment : isDevelopment,
    PORT : PORT,
    LINK_SERVER : LINK_SERVER,
    LINK_IMAGES : LINK_IMAGES,
    BASE_ROUTE : BASE_ROUTE
}