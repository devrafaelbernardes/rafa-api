import updatePosition from "./updatePosition";

const NAME = "InputUpdateMultiplePosition";

const COLUMNS = {
    POSITIONS: 'positions',
};

export const updateMultiplePosition = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.POSITIONS} : [${updatePosition.NAME}!]
        }
    `,
};

export default updateMultiplePosition;