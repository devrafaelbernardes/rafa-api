import Model from "./Model";
import { STUDENT } from "../../database/tables";

export const StudentModel = () => {
    const tableName = STUDENT.TABLE_NAME;

    const classModel = Model();
    const crypt = classModel.getCryptography();

    const columnIsActive = STUDENT.IS_ACTIVE;
    const columnID = STUDENT.ID;
    const crud = classModel.dbCrud({
        tableName,
        columnID,
        columnIsActive,
    });

    return {
        add: async ({ name = null, lastname = null, email = null, password = null } = {}) => {
            if (name && lastname && email && password) {
                try {
                    const salt = await crypt.generateSalt(email + name);
                    password = await crypt.encryptPassword(password, salt);

                    return crud.addOne({
                        data: {
                            [STUDENT.NAME]: name,
                            [STUDENT.LASTNAME]: lastname,
                            [STUDENT.EMAIL]: email,
                            [STUDENT.PASSWORD]: password,
                            [STUDENT.SALT_PASSWORD]: salt,
                        }
                    });
                } catch (error) { }
            }
            return null;
        },
        findOne: ({ where = {} } = {}) => crud.findOne({ where }),
        findById: (id = null) => crud.findOne({
            where: {
                [STUDENT.ID]: id,
            }
        }),
        findByEmail: (email = null) => crud.findOne({
            where: {
                [STUDENT.EMAIL]: email,
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
        findNotIn: ({ ids = [], ...params } = {}) => crud.findNotIn({
            ...params,
            ids,
            column: columnID,
        }),
        count: ({ where = {}, ...params } = {}) => crud.count({
            ...params,
            where,
        }),
        remove: ({ id = null } = {}) => crud.remove({ id }),
        encryptPassword: (password, salt) => crypt.encryptPassword(password, salt),
        update: ({ id = null, data: { name = null, lastname = null, email = null, password = null, profileImageId = null } = {} } = {}) => crud.update({
            id,
            data: {
                [STUDENT.NAME]: name,
                [STUDENT.LASTNAME]: lastname,
                [STUDENT.EMAIL]: email,
                [STUDENT.PASSWORD]: password,
                [STUDENT.PROFILE_IMAGE]: profileImageId,
            }
        })
    };
};

export default StudentModel;