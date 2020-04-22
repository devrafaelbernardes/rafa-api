import material from './material';

const NAME = "CourseMaterial";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    MATERIAL : 'material',
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
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.MATERIAL} : ${material.NAME}
        }
    `,
};

export default TYPE;