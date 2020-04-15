import Model from "./Model";
import { SOCIAL_NETWORK } from "../../database/tables";

export const SocialNetworkModel = () => {
    const tableName = SOCIAL_NETWORK.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = SOCIAL_NETWORK.IS_ACTIVE;
    const columnID = SOCIAL_NETWORK.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    const maxPosition = async () => {
        try {
            var response = await classModel.getDb().from(tableName)
                .where({ [columnIsActive]: true })
                .max({ max: SOCIAL_NETWORK.POSITION })
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
            if (link && imageId) {
                try {
                    let position = await maxPosition();

                    return crud.addOne({
                        data: {
                            [SOCIAL_NETWORK.POSITION]: position + 1,
                            [SOCIAL_NETWORK.IMAGE]: imageId,
                            [SOCIAL_NETWORK.LINK]: link,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [SOCIAL_NETWORK.ID]: id,
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
                [SOCIAL_NETWORK.POSITION]: position,
            }
        })
    };
};

export default SocialNetworkModel;