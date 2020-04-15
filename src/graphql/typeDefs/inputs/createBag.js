
const NAME = "InputCreateBag";

const COLUMNS = {
    NAME: 'name',
    TOTAL: 'total',
    DISCOUNT: 'discount',
    INSTALLMENTS_PRICE: 'installmentsPrice',
    INSTALLMENTS: 'installments',
    DEPOSIT: 'deposit',
    LINK: 'link',
};

export const createBag = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.NAME} : String
            ${COLUMNS.TOTAL} : Float
            ${COLUMNS.DISCOUNT} : Float
            ${COLUMNS.INSTALLMENTS_PRICE} : Float
            ${COLUMNS.INSTALLMENTS} : Int
            ${COLUMNS.DEPOSIT} : Float
            ${COLUMNS.LINK} : String
        }
    `,
};

export default createBag;