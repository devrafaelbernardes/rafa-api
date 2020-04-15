import bagImage from './bagImage';
import pagination from './pagination';

const NAME = "BagImages";
const paginationType = pagination(bagImage.NAME);
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