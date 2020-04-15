
const NAME = "InputSignUpStudent";

const COLUMNS = {
    NAME: 'name',
    LASTNAME: 'lastname',
    EMAIL: 'email',
    PASSWORD: 'password',
};

export const signUpStudent = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.NAME} : String
            ${COLUMNS.LASTNAME} : String
            ${COLUMNS.EMAIL} : String
            ${COLUMNS.PASSWORD} : String
        }
    `,
};

export default signUpStudent;