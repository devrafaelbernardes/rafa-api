import courseVideo from "../../typeDefs/types/courseVideo";
import PaginationGraphql from "./PaginationGraphql";

export const CourseVideosGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : courseVideo.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default CourseVideosGraphql;