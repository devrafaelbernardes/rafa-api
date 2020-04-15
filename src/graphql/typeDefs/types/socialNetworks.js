import socialNetwork from './socialNetwork';
import pagination from './pagination';

const NAME = "SocialNetworks";
const paginationType = pagination(socialNetwork.NAME);
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