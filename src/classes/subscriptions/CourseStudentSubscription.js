import Subscription from './Subscription';
import { COURSE_STUDENT } from '../../database/tables';

export const CourseStudentSubscription = () => {
    const subscription = Subscription();

    const BASE_NAME = 'courseStudent';
    const NAME_SUBSCRIPTIONS = {
        ADDED: `${BASE_NAME}Added`,
    };

    const BASE_TYPE = 'COURSE_STUDENT';
    const TYPES = {
        ADDED: `${BASE_TYPE}_ADDED`,
    };

    return ({
        added: {
            subscribe: () => {
                return subscription.subscribeWithFilter(
                    [TYPES.ADDED],
                    (payload, { courseId } = {}) => {
                        const courseStudent = payload[NAME_SUBSCRIPTIONS.ADDED];
                        const payloadCourseId = String(courseStudent[COURSE_STUDENT.COURSE]); 
                        courseId = String(courseId);
                        return payloadCourseId === courseId;
                    }
                )
            },
            publish: (courseStudent) => subscription.publish(TYPES.ADDED, { [NAME_SUBSCRIPTIONS.ADDED]: courseStudent }),
        },
    });
};

export default CourseStudentSubscription;