import loader from "./loader";
import SocialNetworkModel from "../classes/models/SocialNetworkModel";

const batchSocialNetwork = async(ids) => {
    const classSocialNetworkModel = SocialNetworkModel();
    return classSocialNetworkModel.findIn({ ids });
}

export const loaderSocialNetwork = loader(batchSocialNetwork)

export default loaderSocialNetwork;