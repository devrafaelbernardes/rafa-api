import bag from "../../typeDefs/types/bag";
import PaginationGraphql from "./PaginationGraphql";

export const BagsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : bag.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default BagsGraphql;