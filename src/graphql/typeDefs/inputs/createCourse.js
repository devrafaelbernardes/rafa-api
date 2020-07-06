
const NAME = "InputCreateCourse";

const COLUMNS = {
    NAME: 'name',
    DESCRIPTION: 'description',
    MONTHS_TO_EXPIRES: 'monthsToExpires',
    PURCHASE_LINK : 'purchaseLink',
};

export const createCourse = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
            ${COLUMNS.MONTHS_TO_EXPIRES} : Int
            ${COLUMNS.PURCHASE_LINK} : String
        }
    `,
};

export default createCourse;