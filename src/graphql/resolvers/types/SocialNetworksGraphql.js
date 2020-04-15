import socialNetwork from "../../typeDefs/types/socialNetwork";
import PaginationGraphql from "./PaginationGraphql";

export const SocialNetworksGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType: socialNetwork.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default SocialNetworksGraphql;