import typePageInfo from '../../typeDefs/types/pageInfo';

export const PageInfoGraphql = ({
    totalItems = 0,
    pageTotalItems = 0,
    pageSize = 0,
    pageNumber = 0,
}) => {
    let totalPages = 1;
    let hasNextPage = false;
    let hasPreviousPage = false;
    
    if(totalItems > 0 && pageSize > 0){
        totalPages = Math.ceil(totalItems / pageSize);
        const initialPage = 1;
        const finalPage = totalPages;
        const currentPage = pageNumber;
        const nextPage = currentPage + 1;
        const previousPage = currentPage - 1;

        hasNextPage = currentPage !== finalPage && nextPage <= finalPage;
        hasPreviousPage = previousPage >= initialPage;
    }
    
    return {
        // <column_name> : (<type_values>, <args>, <context>, <infos>) => <return>,
        [typePageInfo.COLUMNS.TOTAL_ITEMS]: pageTotalItems,
        [typePageInfo.COLUMNS.TOTAL_PAGES]: totalPages,
        [typePageInfo.COLUMNS.HAS_NEXT_PAGE]: hasNextPage,
        [typePageInfo.COLUMNS.HAS_PREVIOUS_PAGE]: hasPreviousPage,
    }
};

export default PageInfoGraphql;