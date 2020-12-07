import Model from "./Model";
import { MODELING } from "../../database/tables";

export const ModelingModel = () => {
    const tableName = MODELING.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = MODELING.IS_ACTIVE;
    const columnID = MODELING.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null, description = null, fileName = null, imageId = null, } = {}) => {
            if (name && fileName) {
                try {
                    return crud.addOne({
                        data: {
                            [MODELING.NAME]: name,
                            [MODELING.DESCRIPTION]: description,
                            [MODELING.FILE_NAME]: fileName,
                            [MODELING.IMAGE]: imageId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [MODELING.ID]: id,
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
        update: ({ id = null, data: { name = null, description = null, imageId = null, } = {} } = {}) => crud.update({
            id,
            data: {
                [MODELING.NAME]: name,
                [MODELING.DESCRIPTION]: description,
                [MODELING.IMAGE]: imageId,
            }
        }),
    };
};

export default ModelingModel;