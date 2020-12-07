import dotenv from 'dotenv';
dotenv.config();

export default {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    connectTimeout: 30000,
    limiter: {
        max: 20,
        duration: 300000
    },
};