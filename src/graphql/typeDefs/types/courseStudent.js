import student from './student';

const NAME = "CourseStudent";

const COLUMNS = {
    ID : 'id',
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
            ${COLUMNS.STUDENT} : ${student.NAME}
        }
    `,
};

export default TYPE;