import student from './student';

const NAME = "CourseStudent";

const COLUMNS = {
    ID : 'id',
    STUDENT : 'student',
    EXPIRES_AT : 'expires_at',
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
            ${COLUMNS.EXPIRES_AT} : String
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.STUDENT} : ${student.NAME}
        }
    `,
};

export default TYPE;