import courseMaterial from './courseMaterial';
import pagination from './pagination';

const NAME = "CourseMaterials";
const paginationType = pagination(courseMaterial.NAME);
const COLUMNS = paginationType.COLUMNS;

export const TYPE = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${ NAME }{
            ${ paginationType.CONTENT }
        }
    `,
};

export default TYPE;