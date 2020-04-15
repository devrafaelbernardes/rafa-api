
const NAME = "InputLoginStudent";

const COLUMNS = {
    EMAIL: 'email',
    PASSWORD: 'password',
};

export const loginStudent = {
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

export default loginStudent;