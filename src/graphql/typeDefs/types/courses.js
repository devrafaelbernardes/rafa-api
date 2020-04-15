import course from './course';
import pagination from './pagination';

const NAME = "Courses";
const paginationType = pagination(course.NAME);
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