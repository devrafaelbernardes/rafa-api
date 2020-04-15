import loader from "./loader";
import CourseVideoModel from "../classes/models/CourseVideoModel";

const batchCourseVideo = async(ids) => {
    const classCourseVideoModel = CourseVideoModel();
    return classCourseVideoModel.findIn({ ids });
}

export const loaderCourseVideo = loader(batchCourseVideo)

export default loaderCourseVideo;