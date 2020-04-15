
const NAME = "InputRemoveCourseStudent";

const COLUMNS = {
    COURSE_ID: 'courseId',
    STUDENT_ID: 'studentId',
};

export const removeCourseStudent = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.STUDENT_ID} : ID!
        }
    `,
};

export default removeCourseStudent;