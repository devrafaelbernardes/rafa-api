import typeMaterial from '../../typeDefs/types/material';
import { IMAGE } from '../../../database/tables';
import Upload from '../../../classes/models/Upload';

export const MaterialGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeMaterial.COLUMNS.ID]: (material) => material[IMAGE.ID],
    [typeMaterial.COLUMNS.URL]: (material) => Upload().getMaterialUrl(material[IMAGE.NAME]),
    [typeMaterial.COLUMNS.IS_ACTIVE]: (material) => material[IMAGE.IS_ACTIVE],
    [typeMaterial.COLUMNS.CREATED_AT]: (material) => material[IMAGE.CREATED_AT],
});

export default MaterialGraphql;