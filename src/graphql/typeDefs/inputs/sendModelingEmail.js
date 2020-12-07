
const NAME = "InputSendModelingEmail";

const COLUMNS = {
    TO: 'to',
    MODELING_ID: 'modelingId',
};

export const sendModelingEmail = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.TO} : String
            ${COLUMNS.MODELING_ID} : ID
        }
    `,
};

export default sendModelingEmail;