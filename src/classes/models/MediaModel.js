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

    const maxPosition = async (is_landing_page) => {
        try {
            var response = await classModel.getDb().from(tableName)
                .where({
                    [columnIsActive]: true,
                    ...((is_landing_page === false || is_landing_page === true) && {
                        [MEDIA.IS_LANDING_PAGE]: is_landing_page
                    }),
                })
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
        add: async ({ title = null, is_landing_page = null, link = null, imageId = null } = {}) => {
            if (imageId) {
                try {
                    const position = await maxPosition(is_landing_page);

                    return crud.addOne({
                        data: {
                            [MEDIA.POSITION]: position + 1,
                            [MEDIA.IMAGE]: imageId,
                            [MEDIA.LINK]: link,
                            [MEDIA.TITLE]: title,
                            [MEDIA.IS_LANDING_PAGE]: !!is_landing_page
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