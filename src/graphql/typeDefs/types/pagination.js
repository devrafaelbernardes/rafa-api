import pageInfo from './pageInfo';

export const pagination = (itemsType) => {
    const COLUMNS = {
        ITEMS: 'items',
        PAGE_INFO: 'page_info',
        TOTAL_ITEMS: 'total_items',
    };
    return {
        COLUMNS,
        CONTENT: `
            ${COLUMNS.ITEMS} : [${itemsType}!]
            ${COLUMNS.PAGE_INFO} : ${pageInfo.NAME}
            ${COLUMNS.TOTAL_ITEMS} : Int
        `,
    }
};

export default pagination;