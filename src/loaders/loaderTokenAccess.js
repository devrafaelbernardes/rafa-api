import loader from "./loader";
import TokenAccessModel from "../classes/models/TokenAccessModel";

const batchTokenAccess = async(ids) => {
    const classTokenAccessModel = TokenAccessModel();
    return classTokenAccessModel.findIn({ ids });
}

export const loaderTokenAccess = loader(batchTokenAccess)

export default loaderTokenAccess;