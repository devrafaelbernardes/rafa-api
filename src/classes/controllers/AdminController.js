import AdminModel from "../models/AdminModel";
import Token from "../models/Token";
import Cryptography from "../models/Cryptography";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import { ADMIN } from "../../database/tables";
import validations from "../../utils/validations";
import AdminSubscription from "../subscriptions/AdminSubscription";
import loaderAdmin from "../../loaders/loaderAdmin";

export const AdminController = () => {
    const classCryptography = Cryptography();
    const classToken = Token();
    const classAdminModel = AdminModel();
    const classImageModel = ImageModel();
    const classUpload = Upload();

    const classAdminSubscription = AdminSubscription();

    return {
        isAdmin: async (adminId = null) => {
            if (adminId) {
                try {
                    adminId = validations.cleanValue(adminId);
                    return classAdminModel.findById(adminId);
                } catch (error) { }
            }
            return null;
        },
        meAdmin: async (params, { tokenUser: { adminId = null } = {} } = {}) => {
            if (adminId) {
                try {
                    adminId = validations.cleanValue(adminId);
                    return classAdminModel.findById(adminId);
                } catch (error) { }
            }
            return null;
        },
        update: async ({ name = null, lastname = null, image = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (adminId) {
                try {
                    adminId = validations.cleanValue(adminId);
                    name = validations.cleanValue(name) || null;
                    lastname = validations.cleanValue(lastname) || null;

                    let imageId = null;
                    if (image) {
                        let imageUploaded = null;
                        try {
                            imageUploaded = await classUpload.uploadImage(image);
                        } catch (error) { }
                        if (imageUploaded && imageUploaded.url) {
                            imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                        }
                    }

                    const updated = await classAdminModel.update({
                        id: adminId,
                        data: {
                            name,
                            lastname,
                            profileImageId: imageId
                        }
                    });
                    if (updated) {
                        await loaderAdmin.clear(adminId);
                        const admin = await loaderAdmin.load(adminId);
                        if (admin) {
                            await classAdminSubscription.updated.publish(admin);
                            return admin;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        updatePassword: async ({ password = null, newPassword = null } = {}, { tokenUser: { adminId = null } = {} } = {}) => {
            if (adminId && password && newPassword) {
                try {
                    adminId = validations.cleanValue(adminId);
                    password = validations.cleanValue(password) || null;
                    newPassword = validations.cleanValue(newPassword) || null;

                    const admin = await classAdminModel.findById(adminId);
                    if (admin) {
                        const currentyPassword = admin[ADMIN.PASSWORD];
                        const salt = admin[ADMIN.SALT_PASSWORD];

                        password = await classCryptography.encryptPassword(password, salt);
                        if (currentyPassword === password) {
                            newPassword = await classCryptography.encryptPassword(newPassword, salt);
                            if (newPassword) {
                                const updated = await classAdminModel.update({
                                    id: adminId,
                                    data: {
                                        password: newPassword
                                    }
                                });
                                if (updated) {
                                    await loaderAdmin.clear(adminId);
                                    return true;
                                }
                            }
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
    };
};

export default AdminController;