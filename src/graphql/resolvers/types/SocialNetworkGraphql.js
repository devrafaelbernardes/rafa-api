import typeSocialNetwork from '../../typeDefs/types/socialNetwork';
import { SOCIAL_NETWORK } from '../../../database/tables';
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

export const SocialNetworkGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeSocialNetwork.COLUMNS.ID]: (socialNetwork) => socialNetwork[SOCIAL_NETWORK.ID],
    [typeSocialNetwork.COLUMNS.LINK]: (socialNetwork) => socialNetwork[SOCIAL_NETWORK.LINK],
    [typeSocialNetwork.COLUMNS.POSITION]: (socialNetwork) => socialNetwork[SOCIAL_NETWORK.POSITION],
    [typeSocialNetwork.COLUMNS.IS_ACTIVE]: (socialNetwork) => socialNetwork[SOCIAL_NETWORK.IS_ACTIVE],
    [typeSocialNetwork.COLUMNS.CREATED_AT]: (socialNetwork) => socialNetwork[SOCIAL_NETWORK.CREATED_AT],
    [typeSocialNetwork.COLUMNS.IMAGE]: (socialNetwork) => findImage(socialNetwork[SOCIAL_NETWORK.IMAGE]),
});

export default SocialNetworkGraphql;