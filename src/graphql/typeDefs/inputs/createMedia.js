
const NAME = "InputCreateMedia";

const COLUMNS = {
    LINK: 'link',
    TITLE : 'title',
    IS_LANDING_PAGE : 'is_landing_page',
};

export const createMedia = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.LINK} : String
            ${COLUMNS.TITLE} : String
            ${COLUMNS.IS_LANDING_PAGE} : Boolean
        }
    `,
};

export default createMedia;