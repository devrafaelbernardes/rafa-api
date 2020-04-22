import typeCourseMaterial from '../../typeDefs/types/courseMaterial';
import { COURSE_MATERIAL } from '../../../database/tables';
import loaderMaterial from '../../../loaders/loaderMaterial';

const findMaterial = async (materialId) => {
    if (materialId) {
        try {
            let material = await loaderMaterial.load(materialId);
            if(material){
                return material;
            }
        } catch (error) { }
    }
    return null;
}

export const CourseMaterialGraphql = ({
    // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
    [typeCourseMaterial.COLUMNS.ID]: (courseMaterial) => courseMaterial[COURSE_MATERIAL.ID],
    [typeCourseMaterial.COLUMNS.NAME]: (courseMaterial) => courseMaterial[COURSE_MATERIAL.NAME],
    [typeCourseMaterial.COLUMNS.IS_ACTIVE]: (courseMaterial) => courseMaterial[COURSE_MATERIAL.IS_ACTIVE],
    [typeCourseMaterial.COLUMNS.CREATED_AT]: (courseMaterial) => courseMaterial[COURSE_MATERIAL.CREATED_AT],
    [typeCourseMaterial.COLUMNS.MATERIAL]: (courseMaterial) => findMaterial(courseMaterial[COURSE_MATERIAL.MATERIAL]),
});

export default CourseMaterialGraphql;