import StudentModel from "../models/StudentModel";
import Pagination from "../models/Pagination";
import ImageModel from "../models/ImageModel";
import Upload from "../models/Upload";
import Cryptography from "../models/Cryptography";

import { STUDENT } from "../../database/tables";

import validations from "../../utils/validations";
import StudentsGraphql from "../../graphql/resolvers/types/StudentsGraphql";
import StudentSubscription from "../subscriptions/StudentSubscription";
import loaderStudent from "../../loaders/loaderStudent";

export const StudentController = () => {
    const classCryptography = Cryptography();
    const classPagination = Pagination();
    const classStudentModel = StudentModel();
    const classStudentSubscription = StudentSubscription();
    const classImageModel = ImageModel();
    const classUpload = Upload();
    
    return {
        isStudent: async (studentId = null) => {
            if (studentId) {
                try {
                    studentId = validations.cleanValue(studentId);

                    return classStudentModel.findById(studentId);
                } catch (error) { }
            }
            return null;
        },
        meStudent: async (params, { tokenUser : { studentId = null } = {} } = {}) => {
            if (studentId) {
                try {
                    studentId = validations.cleanValue(studentId);

                    return classStudentModel.findById(studentId);
                } catch (error) { }
            }
            return null;
        },
        students: async (params, { tokenUser: { adminId = null } = {} } = {}) => {
            let totalItems = 0;
            let items = [];
            let { pagination = null } = params || {};
            const infoPagination = classPagination.get(pagination);

            try {
                if (adminId) {
                    totalItems = await classStudentModel.count();
                    items = await classStudentModel.findAll(classPagination.paramsToModel(params));
                }
            } catch (error) { }

            return StudentsGraphql({
                totalItems,
                items,
                pageTotalItems : items.length || 0,
                ...infoPagination,
            });
        },
        update: async ({ name = null, lastname = null, image = null } = {}, { tokenUser : { studentId = null } = {} } = {}) => {
            if (studentId) {
                try {
                    studentId = validations.cleanValue(studentId);
                    name = validations.cleanValue(name) || null;
                    lastname = validations.cleanValue(lastname) || null;

                    let imageId = null;
                    if (image) {
                        let imageUploaded = null;
                        try {
                            imageUploaded = await classUpload.upload(image);
                        } catch (error) {}
                        if (imageUploaded && imageUploaded.url) {
                            imageId = await classImageModel.add({ url: imageUploaded.url, name: imageUploaded.filename });
                        }
                    }

                    const updated = await classStudentModel.update({
                        id : studentId,
                        data : {
                            name,
                            lastname,
                            profileImageId: imageId
                        }
                    });
                    if(updated){
                        await loaderStudent.clear(studentId);
                        const student = await loaderStudent.load(studentId);
                        if(student){
                            await classStudentSubscription.updated.publish(student);
                            return student;
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        updatePassword: async ({ password = null, newPassword = null } = {}, { tokenUser: { studentId = null } = {} } = {}) => {
            if (studentId && password && newPassword) {
                try {
                    studentId = validations.cleanValue(studentId);
                    password = validations.cleanValue(password) || null;
                    newPassword = validations.cleanValue(newPassword) || null;

                    const student = await classStudentModel.findById(studentId);
                    if (student) {
                        const currentyPassword = student[STUDENT.PASSWORD];
                        const salt = student[STUDENT.SALT_PASSWORD];

                        password = await classCryptography.encryptPassword(password, salt);
                        
                        if (currentyPassword === password) {
                            newPassword = await classCryptography.encryptPassword(newPassword, salt);
                            if (newPassword) {
                                const updated = await classStudentModel.update({
                                    id: studentId,
                                    data: {
                                        password: newPassword
                                    }
                                });
                                if (updated) {
                                    await loaderStudent.clear(studentId);
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

export default StudentController;