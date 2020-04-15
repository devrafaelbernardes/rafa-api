const NAME = "PageInfo";

const COLUMNS = {
    TOTAL_ITEMS: 'total_items',
    TOTAL_PAGES: 'total_pages',
    HAS_PREVIOUS_PAGE: 'has_previous_page',
    HAS_NEXT_PAGE: 'has_next_page',
};

export const pageInfo = {
    NAME,
    COLUMNS,
    CONTENT: `
        type ${ NAME }{
            ${ COLUMNS.TOTAL_ITEMS } : Int
            ${ COLUMNS.TOTAL_PAGES } : Int
            ${ COLUMNS.HAS_PREVIOUS_PAGE } : Boolean!
            ${ COLUMNS.HAS_NEXT_PAGE } : Boolean!
        }
    `,
};

export default pageInfo;