import Upload from '../../../classes/models/Upload';
import { MODELING } from '../../../database/tables';
import loaderImage from '../../../loaders/loaderImage';
import typeModeling from '../../typeDefs/types/modeling';

const classUpload = Upload();

const findImage = async (imageId) => {
    if (imageId) {
        try {
            const image = await loaderImage.load(imageId);
            if(image){
                return image;
            }
        } catch (error) { }
    }
    return null;
}

export const ModelingGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeModeling.COLUMNS.ID]: (modeling) => modeling[MODELING.ID],
    [typeModeling.COLUMNS.LINK]: (modeling) => classUpload.getModelingUrl(modeling[MODELING.FILE_NAME]),
    [typeModeling.COLUMNS.NAME]: (modeling) => modeling[MODELING.NAME],
    [typeModeling.COLUMNS.DESCRIPTION]: (modeling) => modeling[MODELING.DESCRIPTION],
    [typeModeling.COLUMNS.IS_ACTIVE]: (modeling) => modeling[MODELING.IS_ACTIVE],
    [typeModeling.COLUMNS.CREATED_AT]: (modeling) => modeling[MODELING.CREATED_AT],
    [typeModeling.COLUMNS.IMAGE]: (modeling) => findImage(modeling[MODELING.IMAGE]),
});

export default ModelingGraphql;