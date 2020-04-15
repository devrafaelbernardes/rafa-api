
const NAME = "InputCreateSocialNetwork";

const COLUMNS = {
    LINK: 'link',
};

export const createSocialNetwork = {
    NAME,
    COLUMNS,
    CONTENT_FOR_PARAMS: `input : ${NAME}`,
    CONTENT: `
        input ${NAME}{
            ${COLUMNS.LINK} : String
        }
    `,
};

export default createSocialNetwork;