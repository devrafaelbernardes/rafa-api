
const NAME = "InputSendEmailToAll";

const COLUMNS = {
    SUBJECT: 'subject',
    MESSAGE: 'message',
};

export const sendEmailToAll = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.SUBJECT} : String
            ${COLUMNS.MESSAGE} : String
        }
    `,
};

export default sendEmailToAll;