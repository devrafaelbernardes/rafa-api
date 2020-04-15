
const NAME = "InputUpdateCourseVideo";

const COLUMNS = {
    COURSE_ID: 'courseId',
    VIDEO_ID: 'videoId',
    NAME: 'name',
    DESCRIPTION: 'description',
};

export const updateCourseVideo = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.VIDEO_ID} : ID!
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
        }
    `,
};

export default updateCourseVideo;