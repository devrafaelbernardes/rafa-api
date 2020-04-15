import Model from "./Model";
import { BAG } from "../../database/tables";

export const BagModel = () => {
    const tableName = BAG.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = BAG.IS_ACTIVE;
    const columnID = BAG.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    const maxPosition = async () => {
        try {
            var response = await classModel.getDb().from(tableName)
                .where({ [columnIsActive]: true })
                .max({ max: BAG.POSITION })
                .first();
            if (response && response.max) {
                return response.max;
            }
        } catch (error) { }
        return 0;
    }

    return {
        maxPosition,
        add: async ({
            name = null,
            discountPrice = null,
            totalPrice = null,
            installmentsPrice = null,
            installments = null,
            deposit = null,
            link = null,
            firstImageId = null,
            secondImageId = null,
        } = {}) => {
            if (name && totalPrice && installmentsPrice && installments && link) {
                try {
                    const position = await maxPosition();

                    return crud.addOne({
                        data: {
                            [BAG.NAME]: name,
                            [BAG.DISCOUNT_PRICE]: discountPrice,
                            [BAG.TOTAL_PRICE]: totalPrice,
                            [BAG.INSTALLMENTS_PRICE]: installmentsPrice,
                            [BAG.INSTALLMENTS]: installments,
                            [BAG.POSITION]: position + 1,
                            [BAG.DEPOSIT]: deposit,
                            [BAG.LINK]: link,
                            [BAG.FIRST_IMAGE]: firstImageId,
                            [BAG.SECOND_IMAGE]: secondImageId,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [BAG.ID]: id,
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
        update: ({ id = null, data : { name = null, total = null, discount = null, installmentsPrice = null, installments = null, deposit = null, link = null, position = null, firstImageId = null, secondImageId = null } = {} } = {}) => crud.update({ 
            id,
            data : {
                [BAG.NAME] : name,
                [BAG.TOTAL_PRICE] : total,
                [BAG.DISCOUNT_PRICE] : discount,
                [BAG.INSTALLMENTS_PRICE] : installmentsPrice,
                [BAG.INSTALLMENTS] : installments,
                [BAG.DEPOSIT] : deposit,
                [BAG.LINK] : link,
                [BAG.POSITION] : position,
                [BAG.FIRST_IMAGE] : firstImageId,
                [BAG.SECOND_IMAGE] : secondImageId,
            }
        })
    };
};

export default BagModel;