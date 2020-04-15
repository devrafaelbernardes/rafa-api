import typeMedia from '../../typeDefs/types/media';
import { MEDIA } from '../../../database/tables';
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

export const MediaGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeMedia.COLUMNS.ID]: (media) => media[MEDIA.ID],
    [typeMedia.COLUMNS.LINK]: (media) => media[MEDIA.LINK],
    [typeMedia.COLUMNS.POSITION]: (media) => media[MEDIA.POSITION],
    [typeMedia.COLUMNS.IS_ACTIVE]: (media) => media[MEDIA.IS_ACTIVE],
    [typeMedia.COLUMNS.CREATED_AT]: (media) => media[MEDIA.CREATED_AT],
    [typeMedia.COLUMNS.IMAGE]: (media) => findImage(media[MEDIA.IMAGE]),
});

export default MediaGraphql;