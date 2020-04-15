
const NAME = "InputAddCourseStudentByInstructor";

const COLUMNS = {
    COURSE_ID: 'courseId',
    STUDENT_EMAIL: 'studentEmail',
};

export const addCourseStudentByInstructor = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.STUDENT_EMAIL} : String
        }
    `,
};

export default addCourseStudentByInstructor;