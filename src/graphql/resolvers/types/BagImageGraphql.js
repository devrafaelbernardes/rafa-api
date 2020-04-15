import typeBagImage from '../../typeDefs/types/bagImage';
import { BAG_IMAGE } from '../../../database/tables';
import loaderImage from '../../../loaders/loaderImage';

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

export const BagImageGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeBagImage.COLUMNS.ID]: (bagImage) => bagImage[BAG_IMAGE.ID],
    [typeBagImage.COLUMNS.IS_ACTIVE]: (bagImage) => bagImage[BAG_IMAGE.IS_ACTIVE],
    [typeBagImage.COLUMNS.CREATED_AT]: (bagImage) => bagImage[BAG_IMAGE.CREATED_AT],
    [typeBagImage.COLUMNS.IMAGE]: (bagImage) => findImage(bagImage[BAG_IMAGE.IMAGE]),
});

export default BagImageGraphql;