// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

const PORT = 4040;
const isDevelopment = process.env.NODE_ENV !== "production";
const BASE_ROUTE = !isDevelopment ? '/api/' : "/"; //TEMPORÁRIO o "/api/"
const LINK_SERVER = isDevelopment ? 'http://localhost:'+PORT+'/' : 'http://167.172.230.69'+BASE_ROUTE; //temporário
const LINK_IMAGES = LINK_SERVER+'image/';

module.exports = {
    isDevelopment : isDevelopment,
    PORT : PORT,
    LINK_SERVER : LINK_SERVER,
    LINK_IMAGES : LINK_IMAGES,
    BASE_ROUTE : BASE_ROUTE
}