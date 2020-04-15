import Model from "./Model";
import { ADMIN } from "../../database/tables";

export const AdminModel = () => {
    const tableName = ADMIN.TABLE_NAME;

    const classModel = Model();
    const columnIsActive = ADMIN.IS_ACTIVE;
    const columnID = ADMIN.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null, lastname = null, email = null, password = null } = {}) => {
            if (name && lastname && email && password) {
                try {
                    const crypt = classModel.getCryptography();
                    const salt = await crypt.generateSalt(email + name);
                    password = await crypt.encryptPassword(password, salt);

                    return crud.addOne({
                        data: {
                            [ADMIN.NAME]: name,
                            [ADMIN.LASTNAME]: lastname,
                            [ADMIN.EMAIL]: email,
                            [ADMIN.PASSWORD]: password,
                            [ADMIN.SALT_PASSWORD]: salt,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [ADMIN.ID]: id,
            }
        }),
        findByEmail: (email = null) => crud.findOne({
            where: {
                [ADMIN.EMAIL]: email,
            }
        }),
        findAll: ({ where = {}, ...params } = {}) => crud.findAll({
            ...params,
            where,
        }),
        findIn: ({ ids = [], ...params } = {}) => crud.findIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        update: ({ id = null, data: { name = null, lastname = null, email = null, password = null, profileImageId = null } = {} } = {}) => crud.update({
            id,
            data: {
                [ADMIN.NAME]: name,
                [ADMIN.LASTNAME]: lastname,
                [ADMIN.EMAIL]: email,
                [ADMIN.PASSWORD]: password,
                [ADMIN.PROFILE_IMAGE]: profileImageId,
            }
        })
    };
};

export default AdminModel;