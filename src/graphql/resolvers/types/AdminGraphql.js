import typeAdmin from '../../typeDefs/types/admin';
import { ADMIN } from '../../../database/tables';
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

export const AdminGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeAdmin.COLUMNS.ID]: (admin) => admin[ADMIN.ID],
    [typeAdmin.COLUMNS.NAME]: (admin) => admin[ADMIN.NAME],
    [typeAdmin.COLUMNS.LASTNAME]: (admin) => admin[ADMIN.LASTNAME],
    [typeAdmin.COLUMNS.FULL_NAME]: (admin) => `${admin[ADMIN.NAME]} ${admin[ADMIN.LASTNAME]}`,
    [typeAdmin.COLUMNS.EMAIL]: (admin) => admin[ADMIN.EMAIL],
    [typeAdmin.COLUMNS.IS_ACTIVE]: (admin) => admin[ADMIN.IS_ACTIVE],
    [typeAdmin.COLUMNS.CREATED_AT]: (admin) => admin[ADMIN.CREATED_AT],
    [typeAdmin.COLUMNS.PROFILE_IMAGE]: (admin) => findImage(admin[ADMIN.PROFILE_IMAGE]),
});

export default AdminGraphql;