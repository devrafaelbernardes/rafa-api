import typeBag from '../../typeDefs/types/bag';
import { BAG } from '../../../database/tables';
import loaderBagImages from '../../../loaders/loaderBagImages';
import loaderImage from '../../../loaders/loaderImage';

import Pagination from '../../../classes/models/Pagination';
import BagImagesGraphql from './BagImagesGraphql';

const findImage = async (imageId) => {
    if (imageId) {
        try {
            let image = await loaderImage.load(imageId);
            if(image){
                return image;
            }
        } catch (error) { }
    }
    return null;
}

const countImages = async (bagId, params = {}) => {
    if (bagId) {
        try {
            if(params.pagination && params.pagination.page){
                params.pagination.page = null;
            }
            let totalImages = await loaderBagImages(params).load(bagId) || [];
            return totalImages.length;
        } catch (error) { }
    }
    return 0;
}

const findImages = async (bagId, params = {}) => {
    let images = [];
    let countTotalImages = 0;

    const classPagination = Pagination();
    const pagination = classPagination.get(params.pagination);

    if (bagId) {
        try {
            images = await loaderBagImages(classPagination.paramsToModel(params)).load(bagId) || [];
            countTotalImages = await countImages(bagId, params);
        } catch (error) { }
    }
    
    return BagImagesGraphql({
        items : images,
        totalItems : countTotalImages,
        pageTotalItems : images.length || 0,
        ...pagination
    });
}

export const BagGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeBag.COLUMNS.ID]: (bag) => bag[BAG.ID],
    [typeBag.COLUMNS.NAME]: (bag) => bag[BAG.NAME],
    [typeBag.COLUMNS.DISCOUNT_PRICE]: (bag) => bag[BAG.DISCOUNT_PRICE],
    [typeBag.COLUMNS.TOTAL_PRICE]: (bag) => bag[BAG.TOTAL_PRICE],
    [typeBag.COLUMNS.PRICE]: (bag) => bag[BAG.DISCOUNT_PRICE] && bag[BAG.DISCOUNT_PRICE] < bag[BAG.TOTAL_PRICE] ? bag[BAG.DISCOUNT_PRICE] : bag[BAG.TOTAL_PRICE],
    [typeBag.COLUMNS.INSTALLMENTS_PRICE]: (bag) => bag[BAG.INSTALLMENTS_PRICE],
    [typeBag.COLUMNS.INSTALLMENTS]: (bag) => bag[BAG.INSTALLMENTS],
    [typeBag.COLUMNS.POSITION]: (bag) => bag[BAG.POSITION],
    [typeBag.COLUMNS.DEPOSIT]: (bag) => bag[BAG.DEPOSIT],
    [typeBag.COLUMNS.LINK]: (bag) => bag[BAG.LINK],
    [typeBag.COLUMNS.IS_ACTIVE]: (bag) => bag[BAG.IS_ACTIVE],
    [typeBag.COLUMNS.CREATED_AT]: (bag) => bag[BAG.CREATED_AT],

    [typeBag.COLUMNS.FIRST_IMAGE]: (bag) => findImage(bag[BAG.FIRST_IMAGE]),
    [typeBag.COLUMNS.SECOND_IMAGE]: (bag) => findImage(bag[BAG.SECOND_IMAGE]),
    [typeBag.COLUMNS.COUNT_IMAGES]: (bag, params) => countImages(bag[BAG.ID], params),
    [typeBag.COLUMNS.IMAGES]: (bag, params) => findImages(bag[BAG.ID], params),
});

export default BagGraphql;