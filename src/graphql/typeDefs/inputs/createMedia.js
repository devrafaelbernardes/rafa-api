
const NAME = "InputCreateMedia";

const COLUMNS = {
    LINK: 'link',
};

export const createMedia = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.LINK} : String
        }
    `,
};

export default createMedia;