import Model from "./Model";
import TokenAccessModel from "./TokenAccessModel";
import { COURSE_STUDENT } from "../../database/tables";

export const CourseStudentModel = () => {
    const tableName = COURSE_STUDENT.TABLE_NAME;

    const classModel = Model();
    const classTokenAccessModel = TokenAccessModel();
    const columnIsActive = COURSE_STUDENT.IS_ACTIVE;
    const columnID = COURSE_STUDENT.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    const remove = ({ id = null } = {}) => crud.remove({ id });

    const isExpired = (expiresAt) => {
        if(expiresAt){
            const now = (new Date(Date.now())).toLocaleDateString();
            const expiresDate = (new Date(expiresAt)).toLocaleDateString();
            
            return now > expiresDate;
        }
        return false;
    }

    return {
        isExpired,
        isAllowedToAdd: async (id, expiresAt) => {
            let allowedToAdd = isExpired(expiresAt);

            if (allowedToAdd) {
                await remove({ id });
            }

            return allowedToAdd;
        },
        add: async ({ courseId = null, expiresAt = null, studentId = null } = {}) => {
            if (courseId && studentId) {
                try {
                    return crud.addOne({
                        data: {
                            [COURSE_STUDENT.COURSE]: courseId,
                            [COURSE_STUDENT.STUDENT]: studentId,
                            [COURSE_STUDENT.EXPIRES_AT]: expiresAt,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        validatedCourseStudent: async (courseId = null, studentId = null) => {
            if (courseId && studentId) {
                let validated = await crud.count({
                    where: {
                        [COURSE_STUDENT.COURSE]: courseId,
                        [COURSE_STUDENT.STUDENT]: studentId,
                    }
                });
                if (validated > 0) {
                    return true;
                }
            }
            return false;
        },
        findOne: ({ where = {}, ...rest } = {}) => crud.findOne({ where, ...rest }),
        findById: (id = null) => crud.findOne({
            where: {
                [COURSE_STUDENT.ID]: id,
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
        findNotIn: ({ ids = [], ...params } = {}) => crud.findNotIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove,
        update: ({ id = null, data = {} } = {}) => crud.update({ id, data })
    };
};

export default CourseStudentModel;