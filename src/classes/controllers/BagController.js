import BagModel from "../models/BagModel";
import BagImageModel from "../models/BagImageModel";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import { BAG, BAG_IMAGE, IMAGE } from "../../database/tables";
import loaderBag from "../../loaders/loaderBag";
import Pagination from "../../classes/models/Pagination";
import BagsGraphql from "../../graphql/resolvers/types/BagsGraphql";
import validations from "../../utils/validations";

export const BagController = () => {
    const classBagModel = BagModel();
    const classImageModel = ImageModel();
    const classBagImageModel = BagImageModel();
    const classUpload = Upload();
    const classPagination = Pagination();

    const uploadImage = async(file) => {
        if (file) {
            const fileUploaded = await classUpload.upload(file);
            if (fileUploaded && fileUploaded.url) {
                return await classImageModel.add({ url: fileUploaded.url, name: fileUploaded.filename });
            }
        }
        return null;
    };

    const addFirstAndSecondImage = async (bagId = null, firstImageId = null, secondImageId = null) => {
        if(bagId){
            try {
                let data = [];
                if (firstImageId) {
                    data = [...data, { [BAG_IMAGE.BAG]: bagId, [BAG_IMAGE.IMAGE]: firstImageId }]
                }
                if (secondImageId) {
                    data = [...data, { [BAG_IMAGE.BAG]: bagId, [BAG_IMAGE.IMAGE]: secondImageId }]
                }
                if (data.length > 0) {
                    let response = await classBagImageModel.addMultiple({ data });
                    if(response && response.length > 0){
                        return true;
                    }
                }
            } catch (error) { }
        }
        return false;
    }

    return {
        add: async ({ name = null, total = null, discount = null, installmentsPrice = null, installments = null, deposit = null, link = null, firstImage = null, secondImage = null } = {}, context) => {
            if (name && total && installmentsPrice && installments && link) {
                try {
                    name = validations.cleanValue(name);
                    total = validations.cleanValueFloat(total);
                    discount = validations.cleanValueFloat(discount);
                    installmentsPrice = validations.cleanValueFloat(installmentsPrice);
                    installments = validations.cleanValueInt(installments);
                    deposit = validations.cleanValueFloat(deposit);
                    link = validations.cleanValue(link);                    

                    const firstImageId = await uploadImage(firstImage);
                    const secondImageId = await uploadImage(secondImage);

                    const bagId = await classBagModel.add({
                        name,
                        totalPrice: total,
                        discountPrice: discount,
                        installmentsPrice,
                        installments,
                        deposit,
                        link,
                        firstImageId,
                        secondImageId,
                    });

                    if (bagId) {
                        await addFirstAndSecondImage(bagId, firstImageId, secondImageId);

                        const bag = await loaderBag.load(bagId);
                        if (bag) {
                            return bag;
                        }
                    } else {
                        await classBagModel.remove({ id: bagId });
                    }
                } catch (error) { }
            }
            return null;
        },
        update: async ({ id = null, name = null, total = null, discount = null, installmentsPrice = null, installments = null, deposit = null, link = null, position = null, firstImage = null, secondImage = null } = {}, context) => {
            if (id) {
                try {
                    id = validations.cleanValue(id);
                    name = validations.cleanValue(name) || null;
                    total = validations.cleanValueFloat(total) || null;
                    discount = validations.cleanValueFloat(discount) || null;
                    installmentsPrice = validations.cleanValueFloat(installmentsPrice) || null;
                    installments = validations.cleanValueInt(installments) || null;
                    deposit = validations.cleanValueFloat(deposit) || null;
                    link = validations.cleanValue(link) || null;

                    const firstImageId = await uploadImage(firstImage);
                    const secondImageId = await uploadImage(secondImage);

                    const currentyBag = await loaderBag.load(id);
                    if (currentyBag) {
                        const response = await classBagModel.update({
                            id,
                            data: {
                                name,
                                total,
                                discount,
                                installmentsPrice,
                                installments,
                                deposit,
                                link,
                                position,
                                firstImageId,
                                secondImageId
                            },
                        });

                        if (response) {
                            await addFirstAndSecondImage(id, firstImageId, secondImageId);

                            await loaderBag.clear(id);
                            const bag = await loaderBag.load(id);
                            if (bag) {
                                return bag;
                            }
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
                        const currentyBag = await loaderBag.load(id);
                        if (currentyBag) {
                            const updated = await classBagModel.update({
                                id,
                                data: {
                                    position,
                                },
                            });
                            if (!updated) {
                                return false;
                            }else{
                                await loaderBag.clear(id);
                            }
                        }
                    }
                    return true;
                } catch (error) { }
            }
            return false;
        },
        bag: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    let bag = await loaderBag.load(id);
                    if (bag) {
                        return bag;
                    }
                } catch (error) { }
            }
            return null;
        },
        bags: async (params, context) => {
            let items = [];
            let totalItems = 0;
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                items = await classBagModel.findAll(classPagination.paramsToModel(params));
                totalItems = await classBagModel.count();
            } catch (error) { }

            return BagsGraphql({
                items,
                totalItems,
                pageTotalItems : items.length || 0,
                ...infoPagination,
            });
        },
        remove: async ({ id = null } = {}, context) => {
            if (id) {
                try {
                    const bag = await loaderBag.load(id);
                    if (bag) {
                        const removed = await classBagModel.remove({ id });
                        if (removed) {
                            await loaderBag.clear(id);
                            return bag;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
    };
};

export default BagController;