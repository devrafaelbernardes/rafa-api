import course from "../../typeDefs/types/course";
import PaginationGraphql from "./PaginationGraphql";

export const CoursesGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : course.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default CoursesGraphql;