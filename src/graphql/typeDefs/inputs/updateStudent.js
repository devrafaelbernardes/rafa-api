
const NAME = "InputUpdateStudent";

const COLUMNS = {
    NAME: 'name',
    LASTNAME: 'lastname',
};

export const updateStudent = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.NAME} : String
            ${COLUMNS.LASTNAME} : String
        }
    `,
};

export default updateStudent;