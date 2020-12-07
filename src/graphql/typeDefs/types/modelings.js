import modeling from './modeling';
import pagination from './pagination';

const NAME = "Modelings";
const paginationType = pagination(modeling.NAME);
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