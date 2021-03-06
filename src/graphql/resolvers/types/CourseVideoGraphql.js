import typeCourseVideo from '../../typeDefs/types/courseVideo';
import { COURSE_VIDEO } from '../../../database/tables';
import loaderVideo from '../../../loaders/loaderVideo';
import loaderImage from '../../../loaders/loaderImage';

const findVideo = async(videoId) => {
    if(videoId){
        try {
            const video = await loaderVideo.clear(videoId).load(videoId);
            if(video){
                return video;
            }
        } catch (error) {}
    }
    return null;
}

const findThumbnail = async(thumbnailId) => {
    if(thumbnailId){
        try {
            const thumbnail = await loaderImage.load(thumbnailId);
            if(thumbnail){
                return thumbnail;
            }
        } catch (error) {}
    }
    return null;
}

export const CourseVideoGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeCourseVideo.COLUMNS.ID]: (courseVideo) => courseVideo[COURSE_VIDEO.ID],
    [typeCourseVideo.COLUMNS.NAME]: (courseVideo) => courseVideo[COURSE_VIDEO.NAME],
    [typeCourseVideo.COLUMNS.DESCRIPTION]: (courseVideo) => courseVideo[COURSE_VIDEO.DESCRIPTION],
    [typeCourseVideo.COLUMNS.VIDEO]: (courseVideo) => findVideo(courseVideo[COURSE_VIDEO.VIDEO]),
    [typeCourseVideo.COLUMNS.THUMBNAIL]: (courseVideo) => findThumbnail(courseVideo[COURSE_VIDEO.THUMBNAIL]),
    [typeCourseVideo.COLUMNS.IS_ACTIVE]: (courseVideo) => courseVideo[COURSE_VIDEO.IS_ACTIVE],
    [typeCourseVideo.COLUMNS.CREATED_AT]: (courseVideo) => courseVideo[COURSE_VIDEO.CREATED_AT],
});

export default CourseVideoGraphql;