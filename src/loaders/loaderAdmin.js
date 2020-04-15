import loader from "./loader";
import AdminModel from "../classes/models/AdminModel";

const batchAdmin = async(ids) => {
    const classAdminModel = AdminModel();
    return classAdminModel.findIn({ ids });
}

export const loaderAdmin = loader(batchAdmin)

export default loaderAdmin;