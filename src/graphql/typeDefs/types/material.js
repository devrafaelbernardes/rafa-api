const NAME = "Material";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    URL : 'url',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.NAME} : String
            ${COLUMNS.URL} : String
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
        }
    `,
};

export default TYPE;