
const NAME = "InputValidateEmail";

const COLUMNS = {
    TOKEN: 'token',
};

export const validateEmail = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.TOKEN} : String!
        }
    `,
};

export default validateEmail;