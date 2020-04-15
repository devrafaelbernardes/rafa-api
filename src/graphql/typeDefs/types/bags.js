import bag from './bag';
import pagination from './pagination';

const NAME = "Bags";
const paginationType = pagination(bag.NAME);
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