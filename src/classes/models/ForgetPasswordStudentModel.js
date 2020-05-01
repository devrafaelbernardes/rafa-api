import Model from "./Model";
import { FORGOT_PASSWORD_STUDENT } from "../../database/tables";

export const ForgetPasswordStudentModel = () => {
    const tableName = FORGOT_PASSWORD_STUDENT.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = FORGOT_PASSWORD_STUDENT.IS_ACTIVE;
    const columnID = FORGOT_PASSWORD_STUDENT.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async () => {
            try {
                return crud.addOne();
            } catch (error) { }
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
                [FORGOT_PASSWORD_STUDENT.ID]: id,
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
        finish: ({
            id = null,
            data : {
                oldPassword = null,
                studentId = null,
            } = {}
        } = {}) => crud.update({
            id,
            data : {
                [FORGOT_PASSWORD_STUDENT.OLD_PASSWORD] : oldPassword,
                [FORGOT_PASSWORD_STUDENT.STUDENT] : studentId,
                [FORGOT_PASSWORD_STUDENT.IS_OKEY] : true,
            },
        }),
    };
};

export default ForgetPasswordStudentModel;