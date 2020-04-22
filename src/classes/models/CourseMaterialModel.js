import Model from "./Model";
import { COURSE_MATERIAL } from "../../database/tables";

export const CourseMaterialModel = () => {
    const tableName = COURSE_MATERIAL.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = COURSE_MATERIAL.IS_ACTIVE;
    const columnID = COURSE_MATERIAL.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null, courseId = null, materialId = null } = {}) => {
            if (name && courseId && materialId) {
                try {
                    return crud.addOne({
                        data: {
                            [COURSE_MATERIAL.NAME]: name,
                            [COURSE_MATERIAL.COURSE]: courseId,
                            [COURSE_MATERIAL.MATERIAL]: materialId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [COURSE_MATERIAL.ID]: id,
            }
        }),
        findAll: ({ where = {}, ...params } = {}) => crud.findAll({
            ...params,
            where,
        }),
        findIn: ({ ids = [], column = null, ...params } = {}) => crud.findIn({
            ...params,
            ids,
            column: column || columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        update: ({ id = null, data = {} } = {}) => crud.update({ id, data })
    };
};

export default CourseMaterialModel;