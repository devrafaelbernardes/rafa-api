import { PubSub as PubSubDefault, withFilter as withFilterDefault } from 'apollo-server';
import { RedisPubSub } from 'graphql-redis-subscriptions';

/* export const PubSub = new PubSubDefault(); */

export const PubSub = new RedisPubSub({
    connection: {
        //host: REDIS_DOMAIN_NAME,
        //port: PORT_NUMBER,
        retry_strategy: options => {
            // reconnect after upto 3000 milis
            return Math.max(options.attempt * 100, 3000);
        }
    }
});

export const withFilter = withFilterDefault;
export default PubSub;