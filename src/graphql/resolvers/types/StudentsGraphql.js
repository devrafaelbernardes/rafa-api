import student from "../../typeDefs/types/student";
import PaginationGraphql from "./PaginationGraphql";

export const StudentsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType: student.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default StudentsGraphql;