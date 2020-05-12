import email from "../../typeDefs/types/email";
import PaginationGraphql from "./PaginationGraphql";

export const EmailsGraphql = ({
    items = [],
    totalItems = 0,
    pageSize = 0,
    pageNumber = 0,
    ...params
}) => {
    return PaginationGraphql({
        itemsType : email.NAME,
        items,
        totalItems,
        pageNumber,
        pageSize,
        ...params
    })
};

export default EmailsGraphql;