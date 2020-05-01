import Model from "./Model";
import { VALIDATE_STUDENT_EMAIL } from "../../database/tables";

export const ValidateStudentEmailModel = () => {
    const tableName = VALIDATE_STUDENT_EMAIL.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = VALIDATE_STUDENT_EMAIL.IS_ACTIVE;
    const columnID = VALIDATE_STUDENT_EMAIL.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ studentId = null } = {}) => {
            if (studentId) {
                try {
                    return crud.addOne({
                        data: {
                            [VALIDATE_STUDENT_EMAIL.STUDENT]: studentId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        addMultiple: async ({ data = [] } = {}) => {
            if (data.length > 0) {
                try {
                    return crud.add({ data });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [VALIDATE_STUDENT_EMAIL.ID]: id,
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
        update: ({ id = null, data = {} } = {}) => crud.update({ id, data }),
        finish: ({ id = null } = {}) => crud.update({ id, data: { [VALIDATE_STUDENT_EMAIL.IS_OKEY]: true } })
    };
};

export default ValidateStudentEmailModel;