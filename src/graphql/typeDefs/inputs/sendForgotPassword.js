
const NAME = "InputSendForgotPassword";

const COLUMNS = {
    EMAIL: 'email',
};

export const sendForgotPassword = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.EMAIL} : String!
        }
    `,
};

export default sendForgotPassword;