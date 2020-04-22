
const NAME = "InputRemoveCourseMaterial";

const COLUMNS = {
    MATERIAL: 'materialId',
    COURSE: 'courseId',
};

export const removeCourseMaterial = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE} : ID!
            ${COLUMNS.MATERIAL} : ID!
        }
    `,
};

export default removeCourseMaterial;