import typeCourseStudent from '../../typeDefs/types/courseStudent';
import { COURSE_STUDENT } from '../../../database/tables';
import loaderStudent from '../../../loaders/loaderStudent';

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

export const CourseStudentGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeCourseStudent.COLUMNS.ID]: (courseStudent) => courseStudent[COURSE_STUDENT.ID],
    [typeCourseStudent.COLUMNS.IS_ACTIVE]: (courseStudent) => courseStudent[COURSE_STUDENT.IS_ACTIVE],
    [typeCourseStudent.COLUMNS.CREATED_AT]: (courseStudent) => courseStudent[COURSE_STUDENT.CREATED_AT],
    [typeCourseStudent.COLUMNS.STUDENT]: (courseStudent) => findStudent(courseStudent[COURSE_STUDENT.STUDENT]),
});

export default CourseStudentGraphql;