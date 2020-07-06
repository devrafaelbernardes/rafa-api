

export default {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    limiter: {
        max: 20,
        duration: 5000
    },
};