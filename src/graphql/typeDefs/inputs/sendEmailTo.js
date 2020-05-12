
const NAME = "InputSendEmailTo";

const COLUMNS = {
    TO: 'to',
    SUBJECT: 'subject',
    MESSAGE: 'message',
};

export const sendEmailTo = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.TO} : String
            ${COLUMNS.SUBJECT} : String
            ${COLUMNS.MESSAGE} : String
        }
    `,
};

export default sendEmailTo;