import bagImages from './bagImages';
import image from './image';
import pagination from '../inputs/pagination';

const NAME = "Bag";

const COLUMNS = {
    ID : 'id',
    NAME : 'name',
    PRICE : 'price',
    DISCOUNT_PRICE : 'discount_price',
    TOTAL_PRICE : 'total_price',
    INSTALLMENTS_PRICE : 'installments_price',
    INSTALLMENTS : 'installments',
    POSITION : 'position',
    DEPOSIT : 'deposit',
    LINK : 'link',
    FIRST_IMAGE : 'first_image',
    SECOND_IMAGE : 'second_image',
    IS_ACTIVE : 'is_active',
    CREATED_AT : 'created_at',
    IMAGES : 'images',
    COUNT_IMAGES : 'count_images',
};

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.NAME} : String
            ${COLUMNS.PRICE} : Float
            ${COLUMNS.DISCOUNT_PRICE} : Float
            ${COLUMNS.TOTAL_PRICE} : Float
            ${COLUMNS.INSTALLMENTS_PRICE} : Float
            ${COLUMNS.INSTALLMENTS} : Int
            ${COLUMNS.POSITION} : Int
            ${COLUMNS.DEPOSIT} : Float
            ${COLUMNS.LINK} : String
            ${COLUMNS.IS_ACTIVE} : Boolean
            ${COLUMNS.CREATED_AT} : String

            ${COLUMNS.FIRST_IMAGE}: ${image.NAME}
            ${COLUMNS.SECOND_IMAGE}: ${image.NAME}

            ${COLUMNS.COUNT_IMAGES} : Int
            ${COLUMNS.IMAGES}(${pagination.CONTENT_FOR_PARAMS}): ${bagImages.NAME}
        }
    `,
};

export default TYPE;