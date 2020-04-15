import tokenAccess from './tokenAccess';
import admin from './admin';

const NAME = "AdminAccess";

const COLUMNS = {
    ID : 'id',
    TOKEN : 'token',
    ADMIN : 'admin',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.TOKEN} : ${tokenAccess.NAME}
            ${COLUMNS.ADMIN}: ${admin.NAME}
        }
    `,
};

export default TYPE;