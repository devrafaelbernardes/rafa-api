import loader from "./loader";
import ModelingModel from "../classes/models/ModelingModel";

const batchModeling = async(ids) => {
    const classModelingModel = ModelingModel();
    return classModelingModel.findIn({ ids });
}

export const loaderModeling = loader(batchModeling)

export default loaderModeling;