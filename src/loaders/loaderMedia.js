import loader from "./loader";
import MediaModel from "../classes/models/MediaModel";

const batchMedia = async(ids) => {
    const classMediaModel = MediaModel();
    return classMediaModel.findIn({ ids });
}

export const loaderMedia = loader(batchMedia)

export default loaderMedia;