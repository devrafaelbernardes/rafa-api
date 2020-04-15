import loader from "./loader";
import lodash from "lodash";
import CourseModel from "../classes/models/CourseModel";
import CourseStudentModel from "../classes/models/CourseStudentModel";
import { COURSE_STUDENT } from "../database/tables";
import loaderCourse from "./loaderCourse";

const batchStudentCourses = async (studentIds, params) => {
    const classCourseStudentModel = CourseStudentModel();
    let response = await classCourseStudentModel.findIn({
        ids: studentIds,
        column : COURSE_STUDENT.STUDENT,
        ...params,
    });
    
    if (response) {
        const gs = await lodash.groupBy(response, COURSE_STUDENT.STUDENT);
        return studentIds.map(async (id) => {
            const courseStudent = gs[id];
            if(courseStudent){
                const courseStudentId = courseStudent[COURSE_STUDENT.COURSE];
                const course = await loaderCourse.load(courseStudentId);
                if(course){
                    return course;
                }
            }
        });
    }
    return [];
}

export const loaderStudentCourses = (params) => loader(ids => batchStudentCourses(ids, params));

export default loaderStudentCourses;