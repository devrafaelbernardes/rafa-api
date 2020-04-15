import loader from "./loader";
import AdminAccessModel from "../classes/models/AdminAccessModel";

const batchAdminAccess = async(ids) => {
    const classAdminAccessModel = AdminAccessModel();
    return classAdminAccessModel.findIn({ ids });
}

export const loaderAdminAccess = loader(batchAdminAccess)

export default loaderAdminAccess;