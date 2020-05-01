import coursePreview from './coursePreview';
import student from './student';

const NAME = "CourseAccess";

const COLUMNS = {
    ID : 'id',
    CURRENTY_STATE : 'currenty_state',
    TOKEN : 'token',
    EMAIL : 'email',
    COURSE : 'course',
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
            ${COLUMNS.CURRENTY_STATE} : Int
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.TOKEN} : String
            ${COLUMNS.EMAIL} : String
            ${COLUMNS.COURSE}: ${coursePreview.NAME}
            ${COLUMNS.STUDENT}: ${student.NAME}
        }
    `,
};

export default TYPE;