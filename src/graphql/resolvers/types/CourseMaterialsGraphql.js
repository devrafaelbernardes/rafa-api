import courseMaterial from "../../typeDefs/types/courseMaterial";
import PaginationGraphql from "./PaginationGraphql";

export const CourseMaterialsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : courseMaterial.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default CourseMaterialsGraphql;