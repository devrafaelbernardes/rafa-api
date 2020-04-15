import Model from "./Model";
import { VIDEO } from "../../database/tables";

export const VideoModel = () => {
    const tableName = VIDEO.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = VIDEO.IS_ACTIVE;
    const columnID = VIDEO.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null } = {}) => {
            if (name) {
                try {
                    return crud.addOne({
                        data: {
                            [VIDEO.NAME]: name,
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
                [VIDEO.ID]: id,
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

export default VideoModel;