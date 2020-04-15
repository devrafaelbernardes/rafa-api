import Model from "./Model";
import { MEDIA } from "../../database/tables";

export const MediaModel = () => {
    const tableName = MEDIA.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = MEDIA.IS_ACTIVE;
    const columnID = MEDIA.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    const maxPosition = async () => {
        try {
            var response = await classModel.getDb().from(tableName)
                .where({ [columnIsActive]: true })
                .max({ max: MEDIA.POSITION })
                .first();
            if (response && response.max) {
                return response.max;
            }
        } catch (error) { }
        return 0;
    }

    return {
        maxPosition,
        add: async ({ link = null, imageId = null } = {}) => {
            if (imageId) {
                try {
                    let position = await maxPosition();

                    return crud.addOne({
                        data: {
                            [MEDIA.POSITION]: position + 1,
                            [MEDIA.IMAGE]: imageId,
                            [MEDIA.LINK]: link,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [MEDIA.ID]: id,
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
        update: ({ id = null, data: { position = null } = {} } = {}) => crud.update({
            id,
            data: {
                [MEDIA.POSITION]: position,
            }
        })
    };
};

export default MediaModel;