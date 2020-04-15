import Subscription from './Subscription';
import { STUDENT } from '../../database/tables';

export const StudentSubscription = () => {
    const subscription = Subscription();

    const BASE_NAME = 'student';
    const NAME_SUBSCRIPTIONS = {
        ADDED : `${BASE_NAME}Added`,
        UPDATED : `${BASE_NAME}Updated`,
    };
    
    const BASE_TYPE = 'STUDENT';
    const TYPES = {
        ADDED : `${BASE_TYPE}_ADDED`,
        UPDATED : `${BASE_TYPE}_UPDATED`,
    };

    return ({
        added : {
            subscribe : () => subscription.subscribe([TYPES.ADDED]), 
            publish : (student) => subscription.publish(TYPES.ADDED, { [NAME_SUBSCRIPTIONS.ADDED] : student }),
        },
        updated : {
            subscribe : () => {
                return subscription.subscribeWithFilter(
                    [TYPES.UPDATED],
                    (payload, { studentId } = {}) => {
                        const student = payload[NAME_SUBSCRIPTIONS.UPDATED];
                        const payloadStudentId = String(student[STUDENT.ID]);
                        studentId = String(studentId);
                        return payloadStudentId === studentId;
                    }
                )
            }, 
            publish : (student) => subscription.publish(TYPES.UPDATED, { [NAME_SUBSCRIPTIONS.UPDATED] : student }),
        },
    });
};

export default StudentSubscription;