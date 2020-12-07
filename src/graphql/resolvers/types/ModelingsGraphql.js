import modeling from "../../typeDefs/types/modeling";
import PaginationGraphql from "./PaginationGraphql";

export const ModelingsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType: modeling.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default ModelingsGraphql;