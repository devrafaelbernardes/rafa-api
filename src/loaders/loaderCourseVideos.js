import loader from "./loader";
import lodash from "lodash";
import CourseVideoModel from "../classes/models/CourseVideoModel";
import { COURSE_VIDEO } from "../database/tables";

const batchCourseVideos = async (courseIds, params) => {
    const classCourseVideoModel = CourseVideoModel();
    let response = await classCourseVideoModel.findIn({
        ids: courseIds,
        column : COURSE_VIDEO.COURSE,
        ...params,
    });
    
    if (response) {
        const gs = await lodash.groupBy(response, COURSE_VIDEO.COURSE);
        return courseIds.map(async (id) => gs[id]);
    }
    return [];
}

export const loaderCourseVideos = (params) => loader(ids => batchCourseVideos(ids, params));

export default loaderCourseVideos;