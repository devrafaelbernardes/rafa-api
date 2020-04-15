
const NAME_INPUT_ORDER = "InputOrderQuery";
const NAME_INPUT_PAGE = "InputPage";
const NAME = "InputPagination";

const COLUMNS = {
    PAGE : {
        SIZE : 'size',
        NUMBER : 'number',
    },
    ORDER : {
        COLUMN : 'column',
        ORDER : 'order',
    },
    PAGINATION : {
        PAGE : 'page',
    },
};

export const pagination = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `pagination : ${NAME}, orderBy : [${NAME_INPUT_ORDER}!]`,
    CONTENT: `
        input ${NAME_INPUT_PAGE} {
            ${COLUMNS.PAGE.SIZE} : Int!
            ${COLUMNS.PAGE.NUMBER} : Int
        }

        input ${NAME_INPUT_ORDER} {
            ${COLUMNS.ORDER.COLUMN} : String!
            ${COLUMNS.ORDER.ORDER} : String
        }

        input ${NAME}{
            ${COLUMNS.PAGINATION.PAGE} : ${NAME_INPUT_PAGE}
        }
    `,
};

export default pagination;