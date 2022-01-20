import image from './image';

const NAME = "Media";

const COLUMNS = {
    ID : 'id',
    TITLE : 'title',
    IS_LANDING_PAGE : 'is_landing_page',
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
            ${COLUMNS.TITLE} : String
            ${COLUMNS.LINK} : String
            ${COLUMNS.IS_LANDING_PAGE} : Boolean
            ${COLUMNS.POSITION} : Int
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String
            ${COLUMNS.IMAGE} : ${image.NAME}
        }
    `,
};

export default TYPE;