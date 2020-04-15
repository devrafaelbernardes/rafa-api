
const NAME = "InputUpdateAdmin";

const COLUMNS = {
    NAME: 'name',
    LASTNAME: 'lastname',
};

export const updateAdmin = {
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

export default updateAdmin;