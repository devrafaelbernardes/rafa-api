
const NAME = "InputAddCourseMaterial";

const COLUMNS = {
    NAME: 'name',
    COURSE_ID: 'courseId',
};

export const addCourseMaterial = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.NAME} : String
        }
    `,
};

export default addCourseMaterial;