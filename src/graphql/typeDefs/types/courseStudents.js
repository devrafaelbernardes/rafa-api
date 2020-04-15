import courseStudent from './courseStudent';
import pagination from './pagination';

const NAME = "CourseStudents";
const paginationType = pagination(courseStudent.NAME);
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