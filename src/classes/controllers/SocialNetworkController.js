import SocialNetworkModel from "../models/SocialNetworkModel";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import { SOCIAL_NETWORK } from "../../database/tables";
import loaderSocialNetwork from "../../loaders/loaderSocialNetwork";
import Pagination from "../models/Pagination";
import SocialNetworksGraphql from "../../graphql/resolvers/types/SocialNetworksGraphql";
import validations from "../../utils/validations";

export const SocialNetworkController = () => {
    const classSocialNetworkModel = SocialNetworkModel();
    const classPagination = Pagination();
    const classImageModel = ImageModel();
    const classUpload = Upload();

    return {
        add: async ({ link = null, image = null } = {}, context) => {
            if (link) {
                try {
                    link = validations.cleanValue(link);

                    const imageUploaded = await classUpload.uploadImage(image);
                    if (imageUploaded && imageUploaded.url) {
                        const imageId = await classImageModel.add({ url : imageUploaded.url, name : imageUploaded.filename });
                        if (imageId) {
                            let socialNetworkId = await classSocialNetworkModel.add({
                                imageId,
                                link
                            });
                            if (socialNetworkId) {
                                const socialNetwork = await loaderSocialNetwork.load(socialNetworkId);
                                if (socialNetwork) {
                                    return socialNetwork;
                                }
                            } else {
                                await classSocialNetworkModel.remove({ id: socialNetworkId });
                            }
                        }else{
                            await classUpload.remove(image);
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        updatePositions: async ({ positions = [] } = {}, context) => {
            if (positions && positions.length > 0) {
                try {
                    for (const { id, position } of positions) {
                        const currentySocialNetwork = await loaderSocialNetwork.load(id);
                        if (currentySocialNetwork) {
                            const updated = await classSocialNetworkModel.update({
                                id,
                                data: {
                                    position,
                                },
                            });
                            if (!updated) {
                                return false;
                            }else{
                                await loaderSocialNetwork.clear(id);
                            }
                        }
                    }
                    return true;
                } catch (error) { }
            }
            return false;
        },
        socialNetwork: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    let socialNetwork = await loaderSocialNetwork.load(id);
                    if (socialNetwork) {
                        return socialNetwork;
                    }
                } catch (error) { }
            }
            return null;
        },
        socialNetworks: async (params, context) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                items = await classSocialNetworkModel.findAll(classPagination.paramsToModel(params));
                totalItems = await classSocialNetworkModel.count();
            } catch (error) { }

            return SocialNetworksGraphql({
                items,
                totalItems,
                pageTotalItems : items.length || 0,
                ...infoPagination,
            });
        },
        remove: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    const socialNetwork = await loaderSocialNetwork.load(id);
                    if (socialNetwork) {
                        const removed = await classSocialNetworkModel.remove({ id });
                        if(removed){
                            await loaderSocialNetwork.clear(id);
                            return socialNetwork;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default SocialNetworkController;