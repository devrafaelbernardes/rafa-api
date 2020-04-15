import tokenAccess from './tokenAccess';
import student from './student';

const NAME = "StudentAccess";

const COLUMNS = {
    ID : 'id',
    TOKEN : 'token',
    STUDENT : 'student',
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
            ${COLUMNS.STUDENT}: ${student.NAME}
        }
    `,
};

export default TYPE;