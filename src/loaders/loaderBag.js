import loader from "./loader";
import BagModel from "../classes/models/BagModel";

const batchBag = async(ids) => {
    const classBagModel = BagModel();
    return classBagModel.findIn({ ids });
}

export const loaderBag = loader(batchBag)

export default loaderBag;