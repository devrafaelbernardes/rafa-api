import loader from "./loader";
import BagImageModel from "../classes/models/BagImageModel";

const batchBagImage = async(ids) => {
    const classBagImageModel = BagImageModel();
    return classBagImageModel.findIn({ ids });
}

export const loaderBagImage = loader(batchBagImage)

export default loaderBagImage;