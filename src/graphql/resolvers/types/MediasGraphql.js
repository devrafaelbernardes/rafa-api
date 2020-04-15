import media from "../../typeDefs/types/media";
import PaginationGraphql from "./PaginationGraphql";

export const MediasGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType: media.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default MediasGraphql;