import Model from "./Model";
import TokenAccessModel from "./TokenAccessModel";
import { STUDENT_ACCESS } from "../../database/tables";

export const StudentAccessModel = () => {
    const tableName = STUDENT_ACCESS.TABLE_NAME;

    const classModel = Model();
    const classTokenAccessModel = TokenAccessModel();
    const columnIsActive = STUDENT_ACCESS.IS_ACTIVE;
    const columnID = STUDENT_ACCESS.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ studentId = null } = {}) => {
            if (studentId) {
                try {
                    const tokenId = await classTokenAccessModel.add();
                    if(tokenId){
                        return crud.addOne({
                            data: {
                                [STUDENT_ACCESS.STUDENT]: studentId,
                                [STUDENT_ACCESS.TOKEN]: tokenId,
                            }
                        });
                    }
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [STUDENT_ACCESS.ID]: id,
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
        update: ({ id = null, data = {} } = {}) => crud.update({ id, data })
    };
};

export default StudentAccessModel;