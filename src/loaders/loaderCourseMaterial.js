import loader from "./loader";
import CourseMaterialModel from "../classes/models/CourseMaterialModel";

const batchCourseMaterial = async(ids) => {
    const classCourseMaterialModel = CourseMaterialModel();
    return classCourseMaterialModel.findIn({ ids });
}

export const loaderCourseMaterial = loader(batchCourseMaterial)

export default loaderCourseMaterial;