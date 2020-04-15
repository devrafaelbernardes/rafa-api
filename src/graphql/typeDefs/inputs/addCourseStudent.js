
const NAME = "InputAddCourseStudent";

const COLUMNS = {
    TOKEN: 'token',
};

export const addCourseStudent = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.TOKEN} : String!
        }
    `,
};

export default addCourseStudent;