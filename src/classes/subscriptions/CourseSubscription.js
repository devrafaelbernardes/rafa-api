import Subscription from './Subscription';
import { COURSE } from '../../database/tables';

export const CourseSubscription = () => {
    const subscription = Subscription();

    const BASE_NAME = 'course';
    const NAME_SUBSCRIPTIONS = {
        ADDED : `${BASE_NAME}Added`,
        UPDATED : `${BASE_NAME}Updated`,
    };
    
    const BASE_TYPE = 'COURSE';
    const TYPES = {
        ADDED : `${BASE_TYPE}_ADDED`,
        UPDATED : `${BASE_TYPE}_UPDATED`,
    };

    return ({
        added : {
            subscribe : () => subscription.subscribe([TYPES.ADDED]), 
            publish : (course) => subscription.publish(TYPES.ADDED, { [NAME_SUBSCRIPTIONS.ADDED] : course }),
        },
        updated : {
            subscribe : () => {
                return subscription.subscribeWithFilter(
                    [TYPES.UPDATED],
                    (payload, { courseId } = {}) => {
                        const course = payload[NAME_SUBSCRIPTIONS.UPDATED];
                        const payloadCourseId = String(course[COURSE.ID]);
                        courseId = String(courseId);
                        return payloadCourseId === courseId;
                    }
                )
            }, 
            publish : (course) => subscription.publish(TYPES.UPDATED, { [NAME_SUBSCRIPTIONS.UPDATED] : course }),
        },
    });
};

export default CourseSubscription;