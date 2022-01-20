const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

let { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

module.exports = {
	client: 'mysql',
	connection: {
		database: DB_NAME,
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		port: DB_PORT,
		charset: 'utf8mb4' // PERMITE EMOJIS
	},
	migrations: {
		directory: path.join(__dirname, 'src', 'database', 'migrations'),
	},
};