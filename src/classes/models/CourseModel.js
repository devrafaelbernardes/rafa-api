import Model from "./Model";
import { COURSE } from "../../database/tables";

export const CourseModel = () => {
    const tableName = COURSE.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = COURSE.IS_ACTIVE;
    const columnID = COURSE.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null, description = null, purchaseLink = null, instructorId = null, imageId = null } = {}) => {
            if (instructorId && name) {
                try {
                    return crud.addOne({
                        data: {
                            [COURSE.NAME]: name,
                            [COURSE.DESCRIPTION]: description,
                            [COURSE.INSTRUCTOR]: instructorId,
                            [COURSE.PROFILE_IMAGE]: imageId,
                            [COURSE.PURCHASE_LINK] : purchaseLink,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        validatedCourseInstructor: async(courseId = null, instructorId = null) => {
            if(courseId && instructorId){
                let validated = await crud.count({
                    where: {
                        [COURSE.ID]: courseId,
                        [COURSE.INSTRUCTOR]: instructorId,
                    }
                });
                if(validated > 0){
                    return true;
                }
            }
            return false;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [COURSE.ID]: id,
            }
        }),
        findAll: ({ where = {}, ...params } = {}) => crud.findAll({
            ...params,
            where,
        }),
        findIn: ({ ids = [], ...params } = {}) => crud.findIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        update: ({ id = null, data : { name = null, description = null, purchaseLink = null, profileImageId = null } = {} } = {}) => crud.update({
            id,
            data: {
                [COURSE.NAME]: name,
                [COURSE.DESCRIPTION]: description,
                [COURSE.PURCHASE_LINK]: purchaseLink,
                [COURSE.PROFILE_IMAGE]: profileImageId,
            }
        })
    };
};

export default CourseModel;