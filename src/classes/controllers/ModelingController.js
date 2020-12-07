import ModelingModel from "../models/ModelingModel";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import loaderModeling from "../../loaders/loaderModeling";
import Pagination from "../models/Pagination";
import ModelingsGraphql from "../../graphql/resolvers/types/ModelingsGraphql";
import validations from "../../utils/validations";

export const ModelingController = () => {
    const classModelingModel = ModelingModel();
    const classPagination = Pagination();
    const classImageModel = ImageModel();
    const classUpload = Upload();

    return {
        add: async ({ name = null, description = null, file = null, image = null } = {}, context) => {
            try {
                name = validations.cleanValue(name) || null;
                description = validations.cleanValue(description) || null;

                const imageUploaded = await classUpload.uploadImage(image);
                let imageId;
                if (imageUploaded && imageUploaded.url) {
                    imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                }

                const fileUploaded = await classUpload.uploadModeling(file);
                if (!fileUploaded) {
                    throw new Error("Error uploading file!");
                }
                const modelingId = await classModelingModel.add({
                    name,
                    description,
                    fileName: fileUploaded.filename,
                    imageId,
                });
                if (!modelingId) {
                    throw new Error("Error creating modeling!");
                }
                const modeling = await loaderModeling.load(modelingId);
                if (modeling) {
                    return modeling;
                }
            } catch (error) { }
            return null;
        },
        modeling: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);

                    let modeling = await loaderModeling.load(id);
                    if (modeling) {
                        return modeling;
                    }
                } catch (error) { }
            }
            return null;
        },
        modelings: async (params, context) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                items = await classModelingModel.findAll(classPagination.paramsToModel(params));
                totalItems = await classModelingModel.count();
            } catch (error) { }

            return ModelingsGraphql({
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

                    const modeling = await loaderModeling.load(id);
                    if (modeling) {
                        const removed = await classModelingModel.remove({ id });
                        if (removed) {
                            await loaderModeling.clear(id);
                            return modeling;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default ModelingController;