import { PubSub as PubSubDefault, withFilter as withFilterDefault } from 'apollo-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import redisConfig from '../../config/redis';

/* export const PubSub = new PubSubDefault(); */
export const PubSub = new RedisPubSub({
    connection: {
        host: redisConfig.host,
        port: redisConfig.port,
        enableOfflineQueue: true,
        retryStrategy: options => {
            // reconnect after upto 3000 milis
            return Math.max(options.attempt * 100, 3000);
        }
    }
});

export const withFilter = withFilterDefault;
export default PubSub;