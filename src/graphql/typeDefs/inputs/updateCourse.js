
const NAME = "InputUpdateCourse";

const COLUMNS = {
    COURSE_ID: 'courseId',
    NAME: 'name',
    DESCRIPTION: 'description',
    MONTHS_TO_EXPIRES: 'monthsToExpires',
    PURCHASE_LINK : 'purchaseLink',
};

export const updateCourse = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
            ${COLUMNS.MONTHS_TO_EXPIRES} : Int
            ${COLUMNS.PURCHASE_LINK} : String
        }
    `,
};

export default updateCourse;