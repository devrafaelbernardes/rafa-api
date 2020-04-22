import typeImage from '../../typeDefs/types/image';
import { IMAGE } from '../../../database/tables';
import Upload from '../../../classes/models/Upload';

export const ImageGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeImage.COLUMNS.ID]: (image) => image[IMAGE.ID],
    [typeImage.COLUMNS.URL]: (image) => Upload().getImageUrl(image[IMAGE.NAME]),
    [typeImage.COLUMNS.IS_ACTIVE]: (image) => image[IMAGE.IS_ACTIVE],
    [typeImage.COLUMNS.CREATED_AT]: (image) => image[IMAGE.CREATED_AT],
});

export default ImageGraphql;