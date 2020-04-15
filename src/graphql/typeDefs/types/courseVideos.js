import courseVideo from './courseVideo';
import pagination from './pagination';

const NAME = "CourseVideos";
const paginationType = pagination(courseVideo.NAME);
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