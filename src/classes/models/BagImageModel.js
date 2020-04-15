import Model from "./Model";
import { BAG_IMAGE } from "../../database/tables";

export const BagImageModel = () => {
    const tableName = BAG_IMAGE.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = BAG_IMAGE.IS_ACTIVE;
    const columnID = BAG_IMAGE.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ bagId = null, imageId = null } = {}) => {
            if (bagId) {
                try {
                    return crud.addOne({
                        data: {
                            [BAG_IMAGE.BAG]: bagId,
                            [BAG_IMAGE.IMAGE]: imageId,
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
                [BAG_IMAGE.ID]: id,
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

export default BagImageModel;