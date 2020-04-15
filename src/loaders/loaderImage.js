import loader from "./loader";
import ImageModel from "../classes/models/ImageModel";

const batchImage = async(ids) => {
    const classImageModel = ImageModel();
    return classImageModel.findIn({ ids });
}

export const loaderImage = loader(batchImage)

export default loaderImage;