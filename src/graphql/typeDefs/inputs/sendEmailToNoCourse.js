
const NAME = "InputSendEmailToNoCourse";

const COLUMNS = {
    COURSE_ID: 'courseId',
    SUBJECT: 'subject',
    MESSAGE: 'message',
};

export const sendEmailToNoCourse = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID
            ${COLUMNS.SUBJECT} : String
            ${COLUMNS.MESSAGE} : String
        }
    `,
};

export default sendEmailToNoCourse;