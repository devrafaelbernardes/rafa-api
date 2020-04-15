
const NAME = "InputUpdatePosition";

const COLUMNS = {
    ID: 'id',
    POSITION: 'position',
};

export const updatePosition = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.ID} : ID!
            ${COLUMNS.POSITION} : Int
        }
    `,
};

export default updatePosition;