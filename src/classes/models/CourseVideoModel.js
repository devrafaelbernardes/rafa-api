import Model from "./Model";
import { COURSE_VIDEO } from "../../database/tables";

export const CourseVideoModel = () => {
    const tableName = COURSE_VIDEO.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = COURSE_VIDEO.IS_ACTIVE;
    const columnID = COURSE_VIDEO.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ courseId = null, name = null, description = null, videoId = null, thumbnailId = null } = {}) => {
            if (courseId && name && videoId) {
                try {
                    return crud.addOne({
                        data: {
                            [COURSE_VIDEO.COURSE]: courseId,
                            [COURSE_VIDEO.NAME]: name,
                            [COURSE_VIDEO.DESCRIPTION]: description,
                            [COURSE_VIDEO.VIDEO]: videoId,
                            [COURSE_VIDEO.THUMBNAIL]: thumbnailId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [COURSE_VIDEO.ID]: id,
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
        update: ({ id = null, data: { name = null, description = null, thumbnailId = null } = {} } = {}) => crud.update({
            id,
            data: {
                [COURSE_VIDEO.NAME]: name,
                [COURSE_VIDEO.DESCRIPTION]: description,
                [COURSE_VIDEO.THUMBNAIL]: thumbnailId,
            }
        }),
    };
};

export default CourseVideoModel;