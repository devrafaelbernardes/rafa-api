
const NAME = "InputUpdatePassword";

const COLUMNS = {
    PASSWORD: 'password',
    NEW_PASSWORD: 'newPassword',
};

export const updatePassword = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.PASSWORD} : String
            ${COLUMNS.NEW_PASSWORD} : String
        }
    `,
};

export default updatePassword;