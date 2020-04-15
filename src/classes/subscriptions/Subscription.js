import pubsub, { withFilter } from './PubSub';

export const Subscription = () => {
    return ({
        subscribe: (keys = []) => pubsub.asyncIterator(keys),
        subscribeWithFilter: (keys = [], condition) => withFilter(
            () => pubsub.asyncIterator(keys),
            (payload, variables) => condition ? condition(payload, variables) : false,
        ),
        publish: (key = "", data = {}) => pubsub.publish(key, data),
    });
};
export default Subscription;