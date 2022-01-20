import MediaModel from "../models/MediaModel";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import { MEDIA } from "../../database/tables";
import loaderMedia from "../../loaders/loaderMedia";
import Pagination from "../models/Pagination";
import MediasGraphql from "../../graphql/resolvers/types/MediasGraphql";
import validations from "../../utils/validations";

export const MediaController = () => {
    const classMediaModel = MediaModel();
    const classPagination = Pagination();
    const classImageModel = ImageModel();
    const classUpload = Upload();

    return {
        add: async ({ title = null, is_landing_page, link = null, image = null } = {}, context) => {
            try {
                title = validations.cleanValue(title) || null;
                link = validations.cleanValue(link) || null;

                const imageUploaded = await classUpload.uploadImage(image);
                if (imageUploaded && imageUploaded.url) {
                    const imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                    if (imageId) {
                        const mediaId = await classMediaModel.add({
                            imageId,
                            link,
                            title,
                            is_landing_page
                        });
                        if (mediaId) {
                            const media = await loaderMedia.load(mediaId);
                            if (media) {
                                return media;
                            }
                        } else {
                            await classMediaModel.remove({ id: mediaId });
                        }
                    } else {
                        await classUpload.remove(image);
                    }
                }
            } catch (error) {}
            return null;
        },
        updatePositions: async ({ positions = [] } = {}, context) => {
            if (positions && positions.length > 0) {
                try {
                    for (const { id, position } of positions) {
                        const currentyMedia = await loaderMedia.load(id);
                        if (currentyMedia) {
                            const updated = await classMediaModel.update({
                                id,
                                data: {
                                    position,
                                },
                            });
                            if (!updated) {
                                return false;
                            } else {
                                await loaderMedia.clear(id);
                            }
                        }
                    }
                    return true;
                } catch (error) { }
            }
            return false;
        },
        media: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    let media = await loaderMedia.load(id);
                    if (media) {
                        return media;
                    }
                } catch (error) { }
            }
            return null;
        },
        medias: async (params, context) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null, is_landing_page = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                items = await classMediaModel.findAll({ ...classPagination.paramsToModel(params), is_landing_page });
                totalItems = await classMediaModel.count();
            } catch (error) { }

            return MediasGraphql({
                items,
                totalItems,
                pageTotalItems: items.length || 0,
                ...infoPagination,
            });
        },
        remove: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    const media = await loaderMedia.load(id);
                    if (media) {
                        const removed = await classMediaModel.remove({ id });
                        if (removed) {
                            await loaderMedia.clear(id);
                            return media;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default MediaController;