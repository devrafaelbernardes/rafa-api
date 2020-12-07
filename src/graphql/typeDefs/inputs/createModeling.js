
const NAME = "InputCreateModeling";

const COLUMNS = {
    NAME : 'name',
    DESCRIPTION : 'description',
};

export const createModeling = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
        }
    `,
};

export default createModeling;