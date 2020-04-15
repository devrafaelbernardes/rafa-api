import Model from "./Model";
import { TOKEN_ACCESS } from "../../database/tables";

export const TokenAccessModel = () => {
    const tableName = TOKEN_ACCESS.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = TOKEN_ACCESS.IS_ACTIVE;
    const columnID = TOKEN_ACCESS.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ token = null } = {}) => {
            if (token) {
                try {
                    return crud.addOne({
                        data: {
                            [TOKEN_ACCESS.TOKEN]: token,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [TOKEN_ACCESS.ID]: id,
            }
        }),
        findByToken: (token = null) => crud.findOne({
            where: {
                [TOKEN_ACCESS.TOKEN]: token,
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

export default TokenAccessModel;