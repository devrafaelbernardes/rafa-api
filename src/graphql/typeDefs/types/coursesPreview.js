import coursePreview from './coursePreview';
import pagination from './pagination';

const NAME = "CoursesPreview";
const paginationType = pagination(coursePreview.NAME);
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