import image from './image';

const NAME = "BagImage";

const COLUMNS = {
    ID : 'id',
    IMAGE : 'image',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.IMAGE} : ${image.NAME}
        }
    `,
};

export default TYPE;