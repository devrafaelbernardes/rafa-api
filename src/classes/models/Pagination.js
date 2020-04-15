import typePagination from '../../graphql/typeDefs/inputs/pagination';

export const Pagination = () => {

    return {
        get: (pagination) => {
            const params = {};

            if (pagination) {
                pagination = { ...pagination };
                if (pagination[typePagination.COLUMNS.PAGINATION.PAGE]) {
                    const page = pagination[typePagination.COLUMNS.PAGINATION.PAGE];
                    if (page[typePagination.COLUMNS.PAGE.SIZE]) {
                        params.pageSize = page[typePagination.COLUMNS.PAGE.SIZE];
                    }
                    if (page[typePagination.COLUMNS.PAGE.NUMBER]) {
                        params.pageNumber = page[typePagination.COLUMNS.PAGE.NUMBER];
                    }
                }
            }
            
            return params;
        },
        paramsToModel : (params = {}) => {
            let pagination = {};
            if(params && params.pagination){
                pagination = params.pagination;
            }
            return ({ ...pagination, ...params });
        }, 
    };
};
export default Pagination;