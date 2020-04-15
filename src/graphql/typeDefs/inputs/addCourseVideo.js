
const NAME = "InputAddCourseVideo";

const COLUMNS = {
    COURSE_ID: 'courseId',
    NAME: 'name',
    DESCRIPTION: 'description',
};

export const addCourseVideo = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
        }
    `,
};

export default addCourseVideo;