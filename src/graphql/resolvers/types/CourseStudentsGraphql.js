import courseStudent from "../../typeDefs/types/courseStudent";
import PaginationGraphql from "./PaginationGraphql";

export const CourseStudentsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : courseStudent.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default CourseStudentsGraphql;