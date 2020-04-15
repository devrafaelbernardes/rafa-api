
const NAME = "InputUpdateBag";

const COLUMNS = {
    ID: 'id',
    NAME: 'name',
    TOTAL: 'total',
    DISCOUNT: 'discount',
    INSTALLMENTS_PRICE: 'installmentsPrice',
    INSTALLMENTS: 'installments',
    DEPOSIT: 'deposit',
    LINK: 'link',
    POSITION: 'position',
};

export const updateBag = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.ID} : ID
            ${COLUMNS.NAME} : String
            ${COLUMNS.TOTAL} : Float
            ${COLUMNS.DISCOUNT} : Float
            ${COLUMNS.INSTALLMENTS_PRICE} : Float
            ${COLUMNS.INSTALLMENTS} : Float
            ${COLUMNS.DEPOSIT} : Int
            ${COLUMNS.LINK} : String
            ${COLUMNS.POSITION} : Int
        }
    `,
};

export default updateBag;