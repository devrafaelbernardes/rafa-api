import QueueBull from "bull";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => ({
    bull: new QueueBull(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options,
}));

export default {
    queues,
    add(name, data){
        const queue = this.queues.find(queue => queue.name === name);
        if(queue){
            return queue.bull.add(data, queue.options);
        }
        return null;
    },
    process(){
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            //queue.bull.on('failed', (data, err) => {});
        });
    },
};