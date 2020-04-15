import courseAccess from "../../typeDefs/types/courseAccess";
import PaginationGraphql from "./PaginationGraphql";

export const CourseAccessesGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : courseAccess.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default CourseAccessesGraphql;