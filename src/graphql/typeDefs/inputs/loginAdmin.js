
const NAME = "InputLoginAdmin";

const COLUMNS = {
    EMAIL: 'email',
    PASSWORD: 'password',
};

export const loginAdmin = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.EMAIL} : String
            ${COLUMNS.PASSWORD} : String
        }
    `,
};

export default loginAdmin;