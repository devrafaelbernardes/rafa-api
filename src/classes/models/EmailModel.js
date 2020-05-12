import Model from "./Model";
import { EMAIL } from "../../database/tables";

export const EmailModel = () => {
    const tableName = EMAIL.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = EMAIL.IS_ACTIVE;
    const columnID = EMAIL.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ to = null, adminId = null, studentId = null, subject = null, message = null } = {}) => {
            if (to && adminId && subject && message) {
                try {
                    return crud.addOne({
                        data: {
                            [EMAIL.TO]: to,
                            [EMAIL.ADMIN]: adminId,
                            [EMAIL.STUDENT]: studentId,
                            [EMAIL.SUBJECT]: subject,
                            [EMAIL.MESSAGE]: message,
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
                [EMAIL.ID]: id,
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
        findNotIn: ({ ids = [], ...params } = {}) => crud.findNotIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        update: ({ id = null, data = {} } = {}) => crud.update({ id, data })
    };
};

export default EmailModel;