
const NAME = "InputGenerateCourseAccess";

const COLUMNS = {
    COURSE_ID: 'courseId',
};

export const generateCourseAccess = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
        }
    `,
};

export default generateCourseAccess;