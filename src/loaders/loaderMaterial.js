import loader from "./loader";
import MaterialModel from "../classes/models/MaterialModel";

const batchMaterial = async(ids) => {
    const classMaterialModel = MaterialModel();
    return classMaterialModel.findIn({ ids });
}

export const loaderMaterial = loader(batchMaterial)

export default loaderMaterial;