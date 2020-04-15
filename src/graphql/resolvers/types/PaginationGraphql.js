import typePagination from '../../typeDefs/types/pagination';
import PageInfoGraphql from './PageInfoGraphql';

export const PaginationGraphql = ({
    itemsType = null,
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    pageTotalItems = 0,
}) => {
    const pagination = typePagination(itemsType);
    
    return {
        [pagination.COLUMNS.ITEMS]: items,
        [pagination.COLUMNS.TOTAL_ITEMS]: totalItems,
        [pagination.COLUMNS.PAGE_INFO]: PageInfoGraphql({ totalItems, pageTotalItems, pageSize, pageNumber }),
    }
};

export default PaginationGraphql;