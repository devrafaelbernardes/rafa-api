// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

let { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

module.exports = {
  client: 'mysql',
  connection: {
    database: DB_NAME,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    charset: 'utf8'
  }
};