
const NAME = "InputCreateCourse";

const COLUMNS = {
    NAME: 'name',
    DESCRIPTION: 'description',
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
            ${COLUMNS.PURCHASE_LINK} : String
        }
    `,
};

export default createCourse;