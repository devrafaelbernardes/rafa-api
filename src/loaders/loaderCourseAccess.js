import loader from "./loader";
import CourseAccessModel from "../classes/models/CourseAccessModel";

const batchCourseAccess = async(ids) => {
    const classCourseAccessModel = CourseAccessModel();
    return classCourseAccessModel.findIn({ ids });
}

export const loaderCourseAccess = loader(batchCourseAccess)

export default loaderCourseAccess;