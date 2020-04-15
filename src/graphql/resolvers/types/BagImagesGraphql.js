import bagImage from "../../typeDefs/types/bagImage";
import PaginationGraphql from "./PaginationGraphql";

export const BagImagesGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : bagImage.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default BagImagesGraphql;