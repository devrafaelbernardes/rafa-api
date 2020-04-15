import image from './image';

const NAME = "Media";

const COLUMNS = {
    ID : 'id',
    LINK : 'link',
    POSITION : 'position',
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
            ${COLUMNS.LINK} : String
            ${COLUMNS.POSITION} : Int
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.IMAGE} : ${image.NAME}
        }
    `,
};

export default TYPE;