import MaterialModel from "../models/MaterialModel";
import CourseMaterialModel from "../models/CourseMaterialModel";
import Upload from "../models/Upload";
import { COURSE_MATERIAL, MATERIAL } from "../../database/tables";
//import Pagination from "../models/Pagination";
import loaderCourseMaterial from "../../loaders/loaderCourseMaterial";
import validations from "../../utils/validations";

export const CourseMaterialController = () => {
    const classMaterialModel = MaterialModel();
    const classCourseMaterialModel = CourseMaterialModel();
    const classUpload = Upload();
    //const classPagination = Pagination();

    return {
        add: async ({ name = null, courseId = null, material = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (name && courseId && material && instructorId) {
                try {
                    instructorId = validations.cleanValue(instructorId);
                    courseId = validations.cleanValue(courseId);
                    name = validations.cleanValue(name);

                    const materialUploaded = await classUpload.uploadMaterial(material);
                    
                    if (materialUploaded && materialUploaded.url) {
                        const materialId = await classMaterialModel.add({ name: materialUploaded.filename });
                        if (materialId) {
                            const courseMaterialId = await classCourseMaterialModel.add({
                                courseId,
                                materialId,
                                name
                            });
                            if (courseMaterialId) {
                                let courseMaterial = await loaderCourseMaterial.load(courseMaterialId);
                                if (courseMaterial) {
                                    return courseMaterial;
                                }
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        remove: async ({ courseId = null, materialId = null } = {}, { tokenUser: { adminId: instructorId = null } = {} } = {}) => {
            if (materialId && courseId && instructorId) {
                try {
                    instructorId = validations.cleanValue(instructorId);
                    courseId = validations.cleanValue(courseId);
                    materialId = validations.cleanValue(materialId);

                    const courseMaterial = await classCourseMaterialModel.findOne({
                        where : {
                            [COURSE_MATERIAL.COURSE] : courseId,
                            [COURSE_MATERIAL.MATERIAL] : materialId,
                        }
                    });
                    if (courseMaterial) {
                        const removed = await classCourseMaterialModel.remove({ id : courseMaterial[COURSE_MATERIAL.ID] });
                        if (removed) {
                            return courseMaterial;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default CourseMaterialController;