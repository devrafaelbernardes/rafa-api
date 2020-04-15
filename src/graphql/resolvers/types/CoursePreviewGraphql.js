import typeCourse from '../../typeDefs/types/course';
import { COURSE } from '../../../database/tables';

import loaderAdmin from '../../../loaders/loaderAdmin';
import loaderImage from '../../../loaders/loaderImage';
import loaderCourseStudents from '../../../loaders/loaderCourseStudents';
import loaderCourseVideos from '../../../loaders/loaderCourseVideos';

const findInstructor = async (instructorId) => {
    if (instructorId) {
        try {
            let instructor = await loaderAdmin.load(instructorId);
            if(instructor){
                return instructor;
            }
        } catch (error) { }
    }
    return null;
}

const findImage = async (imageId) => {
    if (imageId) {
        try {
            let image = await loaderImage.load(imageId);
            if(image){
                return image;
            }
        } catch (error) { }
    }
    return null;
}

const countCourseVideos = async (courseId, params = {}) => {
    if (courseId) {
        try {
            params.pagination = null;
            params.orderBy = null;
            let totalCourseVideos = await loaderCourseVideos(params).load(courseId) || [];
            return totalCourseVideos.length;
        } catch (error) { }
    }
    return 0;
}

const countCourseStudents = async (courseId, params = {}) => {
    if (courseId) {
        try {
            params.pagination = null;
            params.orderBy = null;
            let totalCourseStudents = await loaderCourseStudents(params).load(courseId) || [];
            return totalCourseStudents.length;
        } catch (error) { }
    }
    return 0;
}

export const CourseGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeCourse.COLUMNS.ID]: (course) => course[COURSE.ID],
    [typeCourse.COLUMNS.NAME]: (course) => course[COURSE.NAME],
    [typeCourse.COLUMNS.DESCRIPTION]: (course) => course[COURSE.DESCRIPTION],
    [typeCourse.COLUMNS.PURCHASE_LINK]: (course) => course[COURSE.PURCHASE_LINK],
    [typeCourse.COLUMNS.IS_ACTIVE]: (course) => course[COURSE.IS_ACTIVE],
    [typeCourse.COLUMNS.CREATED_AT]: (course) => course[COURSE.CREATED_AT],
    [typeCourse.COLUMNS.INSTRUCTOR]: (course) => findInstructor(course[COURSE.INSTRUCTOR]),
    [typeCourse.COLUMNS.PROFILE_IMAGE]: (course) => findImage(course[COURSE.PROFILE_IMAGE]),
    [typeCourse.COLUMNS.COUNT_STUDENTS]: (course, params) => countCourseStudents(course[COURSE.ID], params),
    [typeCourse.COLUMNS.COUNT_VIDEOS]: (course, params) => countCourseVideos(course[COURSE.ID], params),
});

export default CourseGraphql;