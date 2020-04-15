import typeAdminAccess from '../../typeDefs/types/adminAccess';
import { ADMIN_ACCESS } from '../../../database/tables';
import loaderAdmin from '../../../loaders/loaderAdmin';
import loaderTokenAccess from '../../../loaders/loaderTokenAccess';

const findAdmin = async (adminId) => {
    if (adminId) {
        try {
            let admin = await loaderAdmin.load(adminId);
            if (admin) {
                return admin;
            }
        } catch (error) { }
    }
    return null;
}

const findTokenAccess = async (tokenId) => {
    if (tokenId) {
        try {
            let token = await loaderTokenAccess.load(tokenId);
            if (token) {
                return token;
            }
        } catch (error) { }
    }
    return null;
}

export const AdminAccessGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeAdminAccess.COLUMNS.ID]: (adminAccess) => adminAccess[ADMIN_ACCESS.ID],
    [typeAdminAccess.COLUMNS.IS_ACTIVE]: (adminAccess) => adminAccess[ADMIN_ACCESS.IS_ACTIVE],
    [typeAdminAccess.COLUMNS.CREATED_AT]: (adminAccess) => adminAccess[ADMIN_ACCESS.CREATED_AT],
    [typeAdminAccess.COLUMNS.ADMIN]: (adminAccess) => findAdmin(adminAccess[ADMIN_ACCESS.ADMIN]),
    [typeAdminAccess.COLUMNS.TOKEN]: (adminAccess) => findTokenAccess(adminAccess[ADMIN_ACCESS.TOKEN]),
});

export default AdminAccessGraphql;