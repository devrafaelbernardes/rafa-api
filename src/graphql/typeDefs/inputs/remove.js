
const NAME = "InputRemove";

const COLUMNS = {
    ID: 'id',
};

export const remove = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.ID} : ID
        }
    `,
};

export default remove;