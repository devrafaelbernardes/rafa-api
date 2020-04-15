import loader from "./loader";
import lodash from "lodash";
import BagImageModel from "../classes/models/BagImageModel";
import { BAG_IMAGE } from "../database/tables";

const batchBagImages = async (bagIds, params) => {
    const classBagImageModel = BagImageModel();
    let response = await classBagImageModel.findIn({
        ids: bagIds,
        column : BAG_IMAGE.BAG,
        ...params,
    });
    
    if (response) {
        const gs = await lodash.groupBy(response, BAG_IMAGE.BAG);
        return bagIds.map(async (id) => gs[id]);
    }
    return [];
}

export const loaderBagImages = (params) => loader(ids => batchBagImages(ids, params));

export default loaderBagImages;