import loader from "./loader";
import CourseStudentModel from "../classes/models/CourseStudentModel";

const batchCourseStudent = async(ids) => {
    const classCourseStudentModel = CourseStudentModel();
    return classCourseStudentModel.findIn({ ids });
}

export const loaderCourseStudent = loader(batchCourseStudent)

export default loaderCourseStudent;