import Model from "./Model";
import TokenAccessModel from "./TokenAccessModel";
import { ADMIN_ACCESS } from "../../database/tables";

export const AdminAccessModel = () => {
    const tableName = ADMIN_ACCESS.TABLE_NAME;

    const classModel = Model();
    const classTokenAccessModel = TokenAccessModel();
    const columnIsActive = ADMIN_ACCESS.IS_ACTIVE;
    const columnID = ADMIN_ACCESS.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ adminId = null } = {}) => {
            if (adminId) {
                try {
                    const tokenId = await classTokenAccessModel.add();
                    if (tokenId) {
                        return crud.addOne({
                            data: {
                                [ADMIN_ACCESS.ADMIN]: adminId,
                                [ADMIN_ACCESS.TOKEN]: tokenId,
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
                [ADMIN_ACCESS.ID]: id,
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

export default AdminAccessModel;