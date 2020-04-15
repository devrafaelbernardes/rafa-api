import loader from "./loader";
import lodash from "lodash";
import CourseStudentModel from "../classes/models/CourseStudentModel";
import { COURSE_STUDENT } from "../database/tables";

const batchCourseStudents = async (courseIds, params) => {
    const classCourseStudentModel = CourseStudentModel();
    let response = await classCourseStudentModel.findIn({
        ids: courseIds,
        column : COURSE_STUDENT.COURSE,
        ...params,
    });
    
    if (response) {
        const gs = await lodash.groupBy(response, COURSE_STUDENT.COURSE);
        return courseIds.map(async (id) => gs[id]);
    }
    return [];
}

export const loaderCourseStudents = (params) => loader(ids => batchCourseStudents(ids, params));

export default loaderCourseStudents;