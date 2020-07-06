

export default {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    connectTimeout: 30000,
    limiter: {
        max: 20,
        duration: 5000
    },
};