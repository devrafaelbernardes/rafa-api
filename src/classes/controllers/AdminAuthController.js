import AdminModel from "../models/AdminModel";
import AdminAccessModel from "../models/AdminAccessModel";
import Token from "../models/Token";
import Cryptography from "../models/Cryptography";
import { ADMIN, ADMIN_ACCESS } from "../../database/tables";
import validations from "../../utils/validations";

export const AdminAuthController = () => {
    const classCryptography = Cryptography();
    const classToken = Token();
    const classAdminModel = AdminModel();
    const classAdminAccessModel = AdminAccessModel();

    const generateToken = async (adminId, tokenId) => classToken.create({ adminId, tokenId });

    return {
        login: async ({ email = null, password = null } = {}) => {
            if (email && password) {
                try {
                    email = validations.cleanValue(email);
                    password = validations.cleanValue(password);

                    const admin = await classAdminModel.findByEmail(email);
                    if (admin) {
                        const salt = admin[ADMIN.SALT_PASSWORD];
                        password = await classCryptography.encryptPassword(password, salt);
                        
                        if (password === admin[ADMIN.PASSWORD]) {
                            const adminId = admin[ADMIN.ID];
                            const accessId = await classAdminAccessModel.add({ adminId });
                            if (accessId) {
                                const adminAccess = await classAdminAccessModel.findById(accessId);
                                if(adminAccess){
                                    return generateToken(adminId, adminAccess[ADMIN_ACCESS.TOKEN]);
                                }
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        /* signUp: async ({ name = null, lastname = null, email = null, password = null } = {}) => {
            if (name && lastname && email && password) {
                try {
                    const adminId = await classAdminModel.add({
                        name,
                        lastname,
                        email,
                        password
                    });
                    if (adminId) {
                        return generateToken(adminId);
                    }
                } catch (error) { }
            }
            return null;
        }, */
    };
};

export default AdminAuthController;