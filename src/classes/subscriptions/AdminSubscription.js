import Subscription from './Subscription';
import { ADMIN } from '../../database/tables';

export const AdminSubscription = () => {
    const subscription = Subscription();

    const BASE_NAME = 'admin';
    const NAME_SUBSCRIPTIONS = {
        ADDED : `${BASE_NAME}Added`,
        UPDATED : `${BASE_NAME}Updated`,
    };
    
    const BASE_TYPE = 'ADMIN';
    const TYPES = {
        ADDED : `${BASE_TYPE}_ADDED`,
        UPDATED : `${BASE_TYPE}_UPDATED`,
    };

    return ({
        added : {
            subscribe : () => subscription.subscribe([TYPES.ADDED]), 
            publish : (admin) => subscription.publish(TYPES.ADDED, { [NAME_SUBSCRIPTIONS.ADDED] : admin }),
        },
        updated : {
            subscribe : () => {
                return subscription.subscribeWithFilter(
                    [TYPES.UPDATED],
                    (payload, { adminId } = {}) => {
                        const admin = payload[NAME_SUBSCRIPTIONS.UPDATED];
                        const payloadAdminId = String(admin[ADMIN.ID]);
                        adminId = String(adminId);
                        return payloadAdminId === adminId;
                    }
                )
            }, 
            publish : (admin) => subscription.publish(TYPES.UPDATED, { [NAME_SUBSCRIPTIONS.UPDATED] : admin }),
        },
    });
};

export default AdminSubscription;