import StudentModel from "../models/StudentModel";
import Token from "../models/Token";
import TokenAccessModel from "../models/TokenAccessModel";
import StudentAccessModel from "../models/StudentAccessModel";
import Cryptography from "../models/Cryptography";
import Email from "../models/Email";
import ValidateStudentEmailModel from "../models/ValidateStudentEmailModel";
import ForgetPasswordStudentModel from "../models/ForgetPasswordStudentModel";

import { STUDENT, STUDENT_ACCESS, FORGOT_PASSWORD_STUDENT, VALIDATE_STUDENT_EMAIL } from "../../database/tables";

import validations from "../../utils/validations";
import StudentSubscription from "../subscriptions/StudentSubscription";
import loaderStudent from "../../loaders/loaderStudent";
import loaderStudentValidatedEmail from "../../loaders/loaderStudentValidatedEmail";

export const StudentAuthController = () => {
    const classCryptography = Cryptography();
    const classToken = Token();
    const classStudentModel = StudentModel();
    const classTokenAccessModel = TokenAccessModel();
    const classStudentAccessModel = StudentAccessModel();
    const classValidateStudentEmailModel = ValidateStudentEmailModel();
    const classForgetPasswordStudentModel = ForgetPasswordStudentModel();
    const classStudentSubscription = StudentSubscription();
    const classEmail = Email();

    const generateToken = async (studentId, tokenId) => classToken.create({ studentId, tokenId });

    return {
        login: async ({ email = null, password = null } = {}) => {
            if (email && password) {
                try {
                    email = validations.cleanValue(email);

                    const student = await classStudentModel.findByEmail(email);
                    if (student) {
                        const salt = student[STUDENT.SALT_PASSWORD];
                        password = await classCryptography.encryptPassword(password, salt);

                        if (password === student[STUDENT.PASSWORD]) {
                            const studentId = student[STUDENT.ID];
                            const accessId = await classStudentAccessModel.add({ studentId });
                            if (accessId) {
                                const studentAccess = await classStudentAccessModel.findById(accessId);
                                if (studentAccess) {
                                    return generateToken(studentId, studentAccess[STUDENT_ACCESS.TOKEN]);
                                }
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        signUp: async ({ name = null, lastname = null, email = null, password = null } = {}) => {
            if (name && lastname && email && password) {
                try {
                    name = validations.cleanValue(name);
                    lastname = validations.cleanValue(lastname);
                    email = validations.cleanValue(email);
                    password = validations.cleanValue(password);

                    const studentId = await classStudentModel.add({
                        name,
                        lastname,
                        email,
                        password
                    });
                    if (studentId) {
                        const accessId = await classStudentAccessModel.add({ studentId });
                        if (accessId) {
                            const studentAccess = await classStudentAccessModel.findById(accessId);
                            if (studentAccess) {
                                const student = await loaderStudent.load(studentId);
                                if (student) {
                                    await classStudentSubscription.added.publish(student);

                                    classEmail.sendWelcome({ to: email, name });

                                    const idValidateEmail = await classValidateStudentEmailModel.add({ studentId });
                                    if (idValidateEmail) {
                                        classEmail.sendValidateEmail({ to: email, name, idValidateStudentEmail: idValidateEmail });
                                    }
                                }
                                return generateToken(studentId, studentAccess[STUDENT_ACCESS.TOKEN]);
                            }
                        }
                    }
                } catch (error) { }
            }
            return null;
        },
        resendValidateEmail: async (params, { tokenUser: { studentId = null } = {} } = {}) => {
            if (studentId) {
                try {
                    studentId = validations.cleanValue(studentId);

                    const student = await loaderStudent.load(studentId);
                    if (student) {
                        const validateStudentEmail = await classValidateStudentEmailModel.findOne({
                            where : {
                                [VALIDATE_STUDENT_EMAIL.STUDENT] : studentId,
                            }
                        });
                        let idValidateStudentEmail = null;
                        if (validateStudentEmail) {
                            idValidateStudentEmail = validateStudentEmail[VALIDATE_STUDENT_EMAIL.ID];    
                        }else{
                            idValidateStudentEmail = await classValidateStudentEmailModel.add({ studentId });
                        }
                        return classEmail.sendValidateEmail({ to: student[STUDENT.EMAIL], name: student[STUDENT.NAME], idValidateStudentEmail });
                    }
                } catch (error) { }
            }
            return false;
        },
        sendForgotPassword: async ({ email = null } = {}) => {
            if (email) {
                try {
                    email = validations.cleanValue(email);

                    const student = await classStudentModel.findByEmail(email);

                    if (student) {
                        const idForgetPassword = await classForgetPasswordStudentModel.add();
                        if (idForgetPassword) {
                            classEmail.sendForgotPassword({ to: email, name: student[STUDENT.NAME], idForgetPassword });
                            return true;
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
        resetPassword: async ({ email = null, password = null, token = null } = {}) => {
            if (email && password && token) {
                try {
                    email = validations.cleanValue(email);
                    password = validations.cleanValue(password);
                    token = validations.cleanValue(token);

                    const { idForgetPassword, email: emailToken } = classToken.get(token) || {};

                    if (idForgetPassword && email === emailToken) {
                        const validatedIdForgetPassword = await classForgetPasswordStudentModel.findOne({
                            where: {
                                [FORGOT_PASSWORD_STUDENT.ID]: idForgetPassword,
                                [FORGOT_PASSWORD_STUDENT.IS_OKEY]: false,
                            },
                        });
                        if (validatedIdForgetPassword) {
                            const student = await classStudentModel.findByEmail(email);

                            if (student) {
                                const studentId = student[STUDENT.ID];
                                const oldPassword = student[STUDENT.PASSWORD];
                                password = await classStudentModel.encryptPassword(password, student[STUDENT.SALT_PASSWORD]);
                                if (password) {
                                    const updated = await classStudentModel.update({ id: studentId, data: { password } });
                                    if (updated) {
                                        const finishedForgetPassword = await classForgetPasswordStudentModel.finish({ id: idForgetPassword, data: { oldPassword, studentId } });
                                        if (finishedForgetPassword) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
        isValidTokenResetPassword: async ({ token = null } = {}) => {
            if (token) {
                try {
                    token = validations.cleanValue(token);
                    const { idForgetPassword, email } = classToken.get(token) || {};
                    
                    if (idForgetPassword && email) {
                        const validated = await classForgetPasswordStudentModel.findOne({
                            where: {
                                [FORGOT_PASSWORD_STUDENT.ID]: idForgetPassword,
                                [FORGOT_PASSWORD_STUDENT.IS_OKEY]: false,
                            },
                        });
                        if (validated) {
                            return true;
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
        validateEmail: async ({ token = null } = {}) => {
            if (token) {
                try {
                    const { idValidateStudentEmail = null } = classToken.get(token) || {};
                    
                    if (idValidateStudentEmail) {
                        const validatedIdStudentEmail = await classValidateStudentEmailModel.findOne({
                            where: {
                                [VALIDATE_STUDENT_EMAIL.ID]: idValidateStudentEmail,
                                //[VALIDATE_STUDENT_EMAIL.IS_OKEY]: false,
                            },
                        });
                        if (validatedIdStudentEmail) {
                            const finished = await classValidateStudentEmailModel.finish({ id: idValidateStudentEmail });
                            if (finished) {
                                const studentId = await validatedIdStudentEmail[VALIDATE_STUDENT_EMAIL.STUDENT];
                                await loaderStudent.clear(studentId);
                                await loaderStudentValidatedEmail.clear(studentId);
                                const student = await loaderStudent.load(studentId);
                                if(student){
                                    await classStudentSubscription.updated.publish(student);
                                }
                                return true;
                            }
                        }
                    }
                } catch (error) { }
            }
            return false;
        },
    };
};

export default StudentAuthController;