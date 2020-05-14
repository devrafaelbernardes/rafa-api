
const NAME = "InputUpdateCourseVideo";

const COLUMNS = {
    COURSE_ID: 'courseId',
    VIDEO_ID: 'videoId',
    LINK: 'link',
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
            ${COLUMNS.LINK} : String
            ${COLUMNS.NAME} : String
            ${COLUMNS.DESCRIPTION} : String
        }
    `,
};

export default updateCourseVideo;