
const NAME = "InputRemoveCourseVideo";

const COLUMNS = {
    COURSE_ID: 'courseId',
    VIDEO_ID: 'videoId',
};

export const removeCourseVideo = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.COURSE_ID} : ID!
            ${COLUMNS.VIDEO_ID} : ID!
        }
    `,
};

export default removeCourseVideo;