import loader from "./loader";
import CourseModel from "../classes/models/CourseModel";

const batchCourse = async(ids) => {
    const classCourseModel = CourseModel();
    return classCourseModel.findIn({ ids });
}

export const loaderCourse = loader(batchCourse)

export default loaderCourse;