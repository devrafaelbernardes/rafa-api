
const NAME = "InputUpdateCourse";

const COLUMNS = {
    COURSE_ID: 'courseId',
    NAME: 'name',
    DESCRIPTION: 'description',
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
            ${COLUMNS.PURCHASE_LINK} : String
        }
    `,
};

export default updateCourse;