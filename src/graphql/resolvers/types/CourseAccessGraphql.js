import typeCourseAccess from '../../typeDefs/types/courseAccess';
import { COURSE_ACCESS } from '../../../database/tables';
import loaderStudent from '../../../loaders/loaderStudent';
import loaderCourse from '../../../loaders/loaderCourse';
import loaderTokenAccess from '../../../loaders/loaderTokenAccess';

const findStudent = async (studentId) => {
    if (studentId) {
        try {
            let student = await loaderStudent.load(studentId);
            if(student){
                return student;
            }
        } catch (error) { }
    }
    return null;
}

const findCourse = async (courseId) => {
    if (courseId) {
        try {
            let course = await loaderCourse.load(courseId);
            if(course){
                return course;
            }
        } catch (error) { }
    }
    return null;
}

const findTokenAccess = async (tokenId) => {
    if (tokenId) {
        try {
            let token = await loaderTokenAccess.load(tokenId);
            if(token){
                return token;
            }
        } catch (error) { }
    }
    return null;
}

export const CourseAccessGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeCourseAccess.COLUMNS.ID]: (courseAccess) => courseAccess[COURSE_ACCESS.ID],
    [typeCourseAccess.COLUMNS.CURRENTY_STATE]: (courseAccess) => courseAccess[COURSE_ACCESS.CURRENTY_STATE],
    [typeCourseAccess.COLUMNS.IS_ACTIVE]: (courseAccess) => courseAccess[COURSE_ACCESS.IS_ACTIVE],
    [typeCourseAccess.COLUMNS.CREATED_AT]: (courseAccess) => courseAccess[COURSE_ACCESS.CREATED_AT],
    [typeCourseAccess.COLUMNS.TOKEN]: (courseAccess) => findTokenAccess(courseAccess[COURSE_ACCESS.TOKEN]),
    [typeCourseAccess.COLUMNS.COURSE]: (courseAccess) => findCourse(courseAccess[COURSE_ACCESS.COURSE]),
    [typeCourseAccess.COLUMNS.STUDENT]: (courseAccess) => findStudent(courseAccess[COURSE_ACCESS.STUDENT]),
});

export default CourseAccessGraphql;