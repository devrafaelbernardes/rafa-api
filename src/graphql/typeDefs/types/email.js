import student from './student';

const NAME = "Email";

const COLUMNS = {
    ID : 'id',
    TO : 'to',
    STUDENT : 'student',
    SUBJECT : 'subject',
    MESSAGE : 'message',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.TO} : String
            ${COLUMNS.SUBJECT} : String
            ${COLUMNS.MESSAGE} : String
            ${COLUMNS.STUDENT} : ${student.NAME}
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
        }
    `,
};

export default TYPE;