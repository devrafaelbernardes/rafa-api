import loader from "./loader";
import lodash from "lodash";
import CourseMaterialModel from "../classes/models/CourseMaterialModel";
import { COURSE_MATERIAL } from "../database/tables";

const batchCourseMaterials = async (courseIds, params) => {
    const classCourseMaterialModel = CourseMaterialModel();
    let response = await classCourseMaterialModel.findIn({
        ids: courseIds,
        column : COURSE_MATERIAL.COURSE,
        ...params,
    });
    
    if (response) {
        const gs = await lodash.groupBy(response, COURSE_MATERIAL.COURSE);
        return courseIds.map(async (id) => gs[id]);
    }
    return [];
}

export const loaderCourseMaterials = (params) => loader(ids => batchCourseMaterials(ids, params));

export default loaderCourseMaterials;