import courseAccess from './courseAccess';
import pagination from './pagination';

const NAME = "CourseAccesses";
const paginationType = pagination(courseAccess.NAME);
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