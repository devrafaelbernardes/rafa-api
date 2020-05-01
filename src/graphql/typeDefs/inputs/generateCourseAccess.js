
const NAME = "InputGenerateCourseAccess";

const COLUMNS = {
    COURSE_ID: 'courseId',
    EMAIL: 'email',
    NAME: 'name',
};

export const generateCourseAccess = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.EMAIL} : String
            ${COLUMNS.NAME} : String
        }
    `,
};

export default generateCourseAccess;