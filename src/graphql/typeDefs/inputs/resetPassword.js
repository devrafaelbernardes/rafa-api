
const NAME = "InputResetPassword";

const COLUMNS = {
    EMAIL: 'email',
    PASSWORD: 'password',
    TOKEN: 'token',
};

export const resetPassword = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.EMAIL} : String!
            ${COLUMNS.PASSWORD} : String!
            ${COLUMNS.TOKEN} : String!
        }
    `,
};

export default resetPassword;